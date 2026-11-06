# ==============================================================================
# Louis Renner Presentation - Windows PowerShell Multi-Threaded HTTP Server
# Zero dependencies - Runs on any Windows 10 & 11 machine via built-in PowerShell
# Single-Instance Cleanup: Automatically stops any prior running server instance
# before binding, preventing HttpListener / port-conflict exceptions!
# Multi-threaded RunspacePool (16 workers) + Chunked HTTP 206 Range Streaming:
# Prevents Chromium / Microsoft Edge 6-socket pool stalls & TCP buffer deadlocks!
# Pure 7-bit ASCII source: immune to GBK / Shift-JIS / CP1252 codepage issues.
# ==============================================================================

param (
    [int]$Port = 8080
)

$ErrorActionPreference = "SilentlyContinue"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = (Resolve-Path (Join-Path $scriptDir "..")).Path
Set-Location -LiteralPath $rootDir

$myPid = $PID
$pidFile = Join-Path $rootDir ".server_pid"
$portFile = Join-Path $rootDir ".active_port"
$candidatePorts = @($Port, 8090, 8181, 8585, 3535, 28080, 38080)

function Test-LocalPortInUse {
    param([int]$TestPort)
    $tcp = $null
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $ar = $tcp.BeginConnect("127.0.0.1", $TestPort, $null, $null)
        if ($ar.AsyncWaitHandle.WaitOne(70, $false) -and $tcp.Connected) {
            return $true
        }
    } catch {} finally {
        if ($null -ne $tcp) { try { $tcp.Close() } catch {} }
    }
    return $false
}

function Send-RennerShutdownProbe {
    param([int]$TargetPort)
    $tcp = $null
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $ar = $tcp.BeginConnect("127.0.0.1", $TargetPort, $null, $null)
        if (-not ($ar.AsyncWaitHandle.WaitOne(85, $false) -and $tcp.Connected)) {
            return $false
        }
        $tcp.EndConnect($ar)
        $stream = $tcp.GetStream()
        $stream.WriteTimeout = 250
        $stream.ReadTimeout = 300
        $reqBytes = [System.Text.Encoding]::ASCII.GetBytes("GET /__renner_shutdown__ HTTP/1.0`r`nHost: 127.0.0.1:$TargetPort`r`nConnection: close`r`n`r`n")
        $stream.Write($reqBytes, 0, $reqBytes.Length)
        $stream.Flush()
        $buf = New-Object byte[] 512
        $n = $stream.Read($buf, 0, $buf.Length)
        if ($n -gt 0) {
            $respTxt = [System.Text.Encoding]::UTF8.GetString($buf, 0, $n)
            if ($respTxt -like '*"stopping":true*') {
                return $true
            }
        }
    } catch {} finally {
        if ($null -ne $tcp) { try { $tcp.Close() } catch {} }
    }
    return $false
}

function Stop-ExistingRennerInstances {
    $portsToProbe = New-Object System.Collections.Generic.List[int]
    if ([System.IO.File]::Exists($portFile)) {
        try {
            $rawP = ([System.IO.File]::ReadAllText($portFile)).Trim()
            $parsedP = 0
            if ([int]::TryParse($rawP, [ref]$parsedP) -and $parsedP -gt 0) {
                $portsToProbe.Add($parsedP)
            }
        } catch {}
    }

    $oldPid = 0
    if ([System.IO.File]::Exists($pidFile)) {
        try {
            $metaJson = [System.IO.File]::ReadAllText($pidFile) | ConvertFrom-Json
            if ($null -ne $metaJson) {
                if ($metaJson.pid) { $oldPid = [int]$metaJson.pid }
                if ($metaJson.port -and -not $portsToProbe.Contains([int]$metaJson.port)) {
                    $portsToProbe.Add([int]$metaJson.port)
                }
            }
        } catch {}
    }

    foreach ($cp in $candidatePorts) {
        if (-not $portsToProbe.Contains($cp)) {
            $portsToProbe.Add($cp)
        }
    }

    # 1. Graceful HTTP shutdown probe (unregisters HTTP.sys prefix immediately!)
    $signaledAny = $false
    foreach ($tp in $portsToProbe) {
        if (Send-RennerShutdownProbe -TargetPort $tp) {
            $signaledAny = $true
        }
    }

    if ($signaledAny) {
        for ($w = 0; $w -lt 10; $w++) {
            if (-not (Test-LocalPortInUse -TestPort $Port)) { break }
            Start-Sleep -Milliseconds 60
        }
    }

    # 2. Terminate recorded PID from .server_pid if still running
    if ($oldPid -gt 0 -and $oldPid -ne $myPid) {
        try {
            $oldProc = Get-Process -Id $oldPid -ErrorAction SilentlyContinue
            if ($null -ne $oldProc -and $oldProc.ProcessName -match '^(powershell|pwsh|python|python3|pythonw|py)$') {
                Stop-Process -Id $oldPid -Force -ErrorAction SilentlyContinue
                Start-Sleep -Milliseconds 120
            }
        } catch {}
    }

    # 3. Sweep any orphaned server_windows.ps1 or server.py processes from previous runs
    try {
        $procs = Get-CimInstance Win32_Process -Filter "Name='powershell.exe' OR Name='pwsh.exe' OR Name='python.exe' OR Name='pythonw.exe'" -ErrorAction SilentlyContinue
        if ($null -eq $procs) {
            $procs = Get-WmiObject Win32_Process -Filter "Name='powershell.exe' OR Name='pwsh.exe' OR Name='python.exe' OR Name='pythonw.exe'" -ErrorAction SilentlyContinue
        }
        foreach ($pr in $procs) {
            $prId = [int]$pr.ProcessId
            $cmdLine = [string]$pr.CommandLine
            if ($prId -gt 0 -and $prId -ne $myPid -and -not [string]::IsNullOrEmpty($cmdLine)) {
                if ($cmdLine -like "*server_windows.ps1*" -or ($cmdLine -like "*server.py*" -and $cmdLine -like "*$rootDir*")) {
                    Stop-Process -Id $prId -Force -ErrorAction SilentlyContinue
                }
            }
        }
    } catch {}

    # 4. Wait briefly for kernel HTTP.sys / WinSock port release
    for ($w = 0; $w -lt 10; $w++) {
        if (-not (Test-LocalPortInUse -TestPort $Port)) { break }
        Start-Sleep -Milliseconds 80
    }
}

Stop-ExistingRennerInstances

$listener = $null
$activePort = 0

foreach ($p in $candidatePorts) {
    $maxTries = if ($p -eq $Port) { 5 } else { 1 }
    for ($attempt = 0; $attempt -lt $maxTries; $attempt++) {
        $cand = $null
        try {
            $cand = New-Object System.Net.HttpListener
            $cand.IgnoreWriteExceptions = $true
            $cand.Prefixes.Add("http://localhost:$p/")
            $cand.Start()
            if ($cand.IsListening) {
                $listener = $cand
                $activePort = $p
                break
            }
        } catch {
            if ($null -ne $cand) {
                try { $cand.Close() } catch {}
            }
            if ($attempt -lt ($maxTries - 1)) {
                Start-Sleep -Milliseconds 140
            }
        }
    }
    if ($null -ne $listener -and $listener.IsListening) {
        break
    }
}

if (-not $listener -or -not $listener.IsListening) {
    Write-Host "[INFO] Local HTTP port unavailable. Falling back to direct offline HTML..." -ForegroundColor Yellow
    exit 0
}

try {
    $pidMeta = "{`"pid`":$myPid,`"port`":$activePort,`"type`":`"powershell`"}"
    [System.IO.File]::WriteAllText($pidFile, $pidMeta)
    [System.IO.File]::WriteAllText($portFile, "$activePort")
} catch {}

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  Louis Renner Masterclass Server (Windows Multi-Thread)" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:$activePort (PID: $myPid)" -ForegroundColor Green
Write-Host "  Press Ctrl+C or close window to stop." -ForegroundColor Gray
Write-Host "=======================================================" -ForegroundColor Cyan

# Request worker scriptblock executed concurrently inside a 16-thread RunspacePool
$requestWorker = {
    param($context, $rootDir, $listener)
    $ErrorActionPreference = "SilentlyContinue"

    $mimeTypes = @{
        ".html"  = "text/html; charset=utf-8"
        ".htm"   = "text/html; charset=utf-8"
        ".aspx"  = "text/html; charset=utf-8"
        ".css"   = "text/css; charset=utf-8"
        ".js"    = "text/javascript; charset=utf-8"
        ".json"  = "application/json; charset=utf-8"
        ".png"   = "image/png"
        ".jpg"   = "image/jpeg"
        ".jpeg"  = "image/jpeg"
        ".webp"  = "image/webp"
        ".svg"   = "image/svg+xml"
        ".woff2" = "font/woff2"
        ".woff"  = "font/woff"
        ".ttf"   = "font/ttf"
        ".mp4"   = "video/mp4"
        ".webm"  = "video/webm"
        ".pdf"   = "application/pdf"
        ".xlsx"  = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ".ico"   = "image/x-icon"
    }

    $req = $context.Request
    $res = $context.Response
    try {
        $rawUrlPath = ($req.RawUrl -split '\?')[0]

        if ($rawUrlPath -eq "/__renner_shutdown__") {
            $body = [System.Text.Encoding]::UTF8.GetBytes('{"ok":true,"stopping":true}')
            $res.StatusCode = 200
            $res.ContentType = "application/json; charset=utf-8"
            $res.ContentLength64 = $body.Length
            $res.OutputStream.Write($body, 0, $body.Length)
            $res.OutputStream.Flush()
            $res.Close()
            try { $listener.Stop() } catch {}
            try { $listener.Close() } catch {}
            return
        }

        if ([string]::IsNullOrEmpty($rawUrlPath) -or $rawUrlPath -eq "/") {
            $relPath = "index.html"
        } elseif ($rawUrlPath -eq "/favicon.ico") {
            $relPath = "Visuell/web_assets/renner_logo_weiss_schatten.png"
        } else {
            $relPath = $rawUrlPath.TrimStart('/')
        }

        $decodedRelPath = [System.Uri]::UnescapeDataString($relPath).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootDir, $decodedRelPath))

        if (-not $filePath.StartsWith($rootDir, [System.StringComparison]::OrdinalIgnoreCase)) {
            $res.StatusCode = 403
            $res.Close()
            return
        }

        if (-not [System.IO.File]::Exists($filePath)) {
            $nfc = $filePath.Normalize([System.Text.NormalizationForm]::FormC)
            $nfd = $filePath.Normalize([System.Text.NormalizationForm]::FormD)
            if ([System.IO.File]::Exists($nfc)) {
                $filePath = $nfc
            } elseif ([System.IO.File]::Exists($nfd)) {
                $filePath = $nfd
            } else {
                $res.StatusCode = 404
                $res.Close()
                return
            }
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $ctype = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $isVideo = ($ext -eq ".mp4" -or $ext -eq ".webm")

        $res.ContentType = $ctype
        $res.Headers.Add("Access-Control-Allow-Origin", "*")
        $res.Headers.Add("Accept-Ranges", "bytes")
        if ($ext -in @(".html", ".js", ".css", ".json")) {
            $res.Headers.Add("Cache-Control", "no-cache")
        } else {
            $res.Headers.Add("Cache-Control", "public, max-age=3600")
        }

        $fileInfo = New-Object System.IO.FileInfo($filePath)
        $fileSize = $fileInfo.Length
        $rangeHeader = $req.Headers["Range"]

        # Max 4 MB per chunk on open-ended video Range requests so sockets never stall in Edge/Chrome!
        $maxVideoChunk = 4194304L

        if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
            $rangeSpec = $rangeHeader.Substring(6).Split(',')[0].Trim()
            $parts = $rangeSpec.Split('-')
            $start = 0L
            $end = $fileSize - 1L
            $openEnded = $false

            if ($parts[0] -ne "") {
                $start = [long]::Parse($parts[0])
                if ($parts.Length -gt 1 -and $parts[1] -ne "") {
                    $end = [long]::Parse($parts[1])
                } else {
                    $openEnded = $true
                }
            } elseif ($parts.Length -gt 1 -and $parts[1] -ne "") {
                $suffixLen = [long]::Parse($parts[1])
                $start = [Math]::Max(0L, $fileSize - $suffixLen)
            }

            if ($start -ge $fileSize -or $start -lt 0L) {
                $res.StatusCode = 416
                $res.Headers.Add("Content-Range", "bytes */$fileSize")
                $res.Close()
                return
            }

            if ($isVideo -and $openEnded -and ($fileSize - $start) -gt $maxVideoChunk) {
                $end = $start + $maxVideoChunk - 1L
            }
            if ($end -ge $fileSize) { $end = $fileSize - 1L }

            $length = $end - $start + 1L
            $res.StatusCode = 206
            $res.Headers.Add("Content-Range", "bytes $start-$end/$fileSize")
            $res.ContentLength64 = $length

            $fs = [System.IO.File]::Open($filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
            try {
                $null = $fs.Seek($start, [System.IO.SeekOrigin]::Begin)
                $buffer = New-Object byte[] 262144
                $remaining = $length
                while ($remaining -gt 0L) {
                    $toRead = [int][Math]::Min($remaining, 262144L)
                    $read = $fs.Read($buffer, 0, $toRead)
                    if ($read -le 0) { break }
                    $res.OutputStream.Write($buffer, 0, $read)
                    $remaining -= $read
                }
                $res.OutputStream.Flush()
            } catch {
                # Normal when browser cancels range request while seeking
            } finally {
                $fs.Close()
            }
        } else {
            $res.StatusCode = 200
            $res.ContentLength64 = $fileSize
            if ($req.HttpMethod -ne "HEAD") {
                $fs = [System.IO.File]::Open($filePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
                try {
                    $buffer = New-Object byte[] 262144
                    while (($read = $fs.Read($buffer, 0, $buffer.Length)) -gt 0) {
                        $res.OutputStream.Write($buffer, 0, $read)
                    }
                    $res.OutputStream.Flush()
                } catch {} finally {
                    $fs.Close()
                }
            }
        }
    } catch {} finally {
        try { $res.Close() } catch {}
    }
}

$pool = [runspacefactory]::CreateRunspacePool(1, 16)
$pool.Open()
$activeJobs = New-Object System.Collections.ArrayList

try {
    while ($null -ne $listener -and $listener.IsListening) {
        # Reap completed worker jobs to keep memory tiny
        for ($i = $activeJobs.Count - 1; $i -ge 0; $i--) {
            $job = $activeJobs[$i]
            if ($job.Handle.IsCompleted) {
                try { $job.PS.EndInvoke($job.Handle) } catch {}
                try { $job.PS.Dispose() } catch {}
                $activeJobs.RemoveAt($i)
            }
        }

        $ctx = $null
        try {
            $ctx = $listener.GetContext()
        } catch {
            # Clean exit when listener is stopped by a newer server instance or Ctrl+C
            break
        }
        if ($null -eq $ctx) { break }

        $ps = [powershell]::Create()
        $ps.RunspacePool = $pool
        $null = $ps.AddScript($requestWorker).AddArgument($ctx).AddArgument($rootDir).AddArgument($listener)
        $handle = $ps.BeginInvoke()
        $null = $activeJobs.Add([PSCustomObject]@{ PS = $ps; Handle = $handle })
    }
} catch {
    # Suppress any shutdown race exceptions
} finally {
    try { $listener.Stop() } catch {}
    try { $listener.Close() } catch {}
    try { $pool.Close() } catch {}
    try { $pool.Dispose() } catch {}
    # Remove .server_pid and .active_port ONLY if still owned by this PID
    try {
        if ([System.IO.File]::Exists($pidFile)) {
            $curMeta = [System.IO.File]::ReadAllText($pidFile) | ConvertFrom-Json
            if ($null -ne $curMeta -and [int]$curMeta.pid -eq $myPid) {
                [System.IO.File]::Delete($pidFile)
                if ([System.IO.File]::Exists($portFile)) {
                    [System.IO.File]::Delete($portFile)
                }
            }
        }
    } catch {}
}
exit 0
