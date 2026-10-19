# ==============================================================================
# Louis Renner Presentation - Windows PowerShell Native HTTP Server
# Zero dependencies - Runs on any Windows 10 & 11 machine via built-in PowerShell
# Supports HTTP 206 Partial Content (Range requests) for smooth MP4 video streaming
# Non-Admin safe: binds only to http://localhost:$Port/
# ==============================================================================

param (
    [int]$Port = 8080
)

$ErrorActionPreference = "SilentlyContinue"

# Resolve absolute root directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = (Resolve-Path (Join-Path $scriptDir "..")).Path
Set-Location $rootDir

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8";
    ".htm"  = "text/html; charset=utf-8";
    ".aspx" = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "text/javascript; charset=utf-8";
    ".json" = "application/json; charset=utf-8";
    ".png"  = "image/png";
    ".jpg"  = "image/jpeg";
    ".jpeg" = "image/jpeg";
    ".webp" = "image/webp";
    ".svg"  = "image/svg+xml";
    ".mp4"  = "video/mp4";
    ".webm" = "video/webm";
    ".ico"  = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
# IMPORTANT: Only register localhost - registering 127.0.0.1 or + requires Administrator privileges
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "=======================================================" -ForegroundColor Cyan
    Write-Host "  🎹 Louis Renner Praesentations-Server (Windows)" -ForegroundColor Yellow
    Write-Host "  URL: http://localhost:$Port" -ForegroundColor Green
    Write-Host "  Druecken Sie Strg+C zum Beenden." -ForegroundColor Gray
    Write-Host "=======================================================" -ForegroundColor Cyan
} catch {
    Write-Host "[HINWEIS] Port $Port ist bereits aktiv oder belegt." -ForegroundColor Yellow
    exit 0
}

# Request processing loop
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        $relPath = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($relPath) -or $relPath -eq "/") {
            $relPath = "index.html"
        }

        $decodedRelPath = [System.Uri]::UnescapeDataString($relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
        $filePath = [System.IO.Path]::Combine($rootDir, $decodedRelPath)

        if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
            $res.StatusCode = 404
            $res.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $ctype = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $res.ContentType = $ctype
        $res.Headers.Add("Access-Control-Allow-Origin", "*")
        $res.Headers.Add("Accept-Ranges", "bytes")

        $fileInfo = New-Object System.IO.FileInfo($filePath)
        $fileSize = $fileInfo.Length

        $rangeHeader = $req.Headers["Range"]
        if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
            $range = $rangeHeader.Substring(6)
            $parts = $range.Split('-')
            $start = 0L
            $end = $fileSize - 1L

            if ($parts[0] -ne "") { $start = [long]::Parse($parts[0]) }
            if ($parts.Length -gt 1 -and $parts[1] -ne "") { $end = [long]::Parse($parts[1]) }
            if ($end -ge $fileSize) { $end = $fileSize - 1L }

            $length = $end - $start + 1L
            $res.StatusCode = 206
            $res.Headers.Add("Content-Range", "bytes $start-$end/$fileSize")
            $res.ContentLength64 = $length

            $fs = [System.IO.File]::OpenRead($filePath)
            try {
                $null = $fs.Seek($start, [System.IO.SeekOrigin]::Begin)
                $buffer = New-Object byte[] 65536
                $remaining = $length
                while ($remaining -gt 0) {
                    $toRead = [Math]::Min($remaining, 65536L)
                    $read = $fs.Read($buffer, 0, [int]$toRead)
                    if ($read -le 0) { break }
                    $res.OutputStream.Write($buffer, 0, $read)
                    $remaining -= $read
                }
            } finally {
                $fs.Close()
            }
        } else {
            $res.StatusCode = 200
            $res.ContentLength64 = $fileSize
            $fs = [System.IO.File]::OpenRead($filePath)
            try {
                $fs.CopyTo($res.OutputStream)
            } finally {
                $fs.Close()
            }
        }
        $res.Close()
    } catch {
        try { $context.Response.Close() } catch {}
    }
}
