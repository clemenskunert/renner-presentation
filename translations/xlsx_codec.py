#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
xlsx_codec.py
Zero-dependency Office Open XML (.xlsx) writer and reader tailored for
multilingual translation review workbooks (DE, EN, ZH, JA).
Handles frozen headers, auto-filters, styled columns, multi-run rich text,
inline strings, and strips Japanese Excel <rPh> phonetic furigana tags on import.
"""

import re
import zipfile
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape as xml_escape

NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL_DOC = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS_REL_PKG = "http://schemas.openxmlformats.org/package/2006/relationships"

ILLEGAL_XML_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def clean_xml_str(val):
    if val is None:
        return ""
    return ILLEGAL_XML_RE.sub("", str(val))


def col_letter(idx_zero_based):
    """0 -> A, 1 -> B, ..., 25 -> Z, 26 -> AA."""
    res = ""
    n = idx_zero_based + 1
    while n > 0:
        n, rem = divmod(n - 1, 26)
        res = chr(65 + rem) + res
    return res


def cell_ref(row_1based, col_0based):
    return f"{col_letter(col_0based)}{row_1based}"


def col_index_from_ref(ref):
    m = re.match(r"([A-Z]+)", ref)
    if not m:
        return 0
    letters = m.group(1)
    idx = 0
    for ch in letters:
        idx = idx * 26 + (ord(ch) - 64)
    return idx - 1


def write_xlsx(filepath, sheets):
    """
    sheets: list of dicts:
      {
        "name": "SheetName",
        "col_widths": [34, 12, ...],
        "freeze_header": True/False,
        "auto_filter": True/False,
        "rows": [
           [ (value, style_id), ... ],  # or plain strings (default style 0)
        ]
      }
    Style IDs:
      0: Default
      1: Forest Green Table Header (bold white on #145943)
      2: Read-Only Meta Cell (gray #F1F5F9)
      3: Reference Lang Cell DE/EN (#F8FAFC)
      4: Editable Target Cell ZH/JA (crisp #FFFFFF)
      5: Optional Comment Cell (#FEFCE8)
      6: Section Banner (bold #145943 on #ECFDF5)
    """
    shared_strings = []
    ss_index = {}

    def get_ss_idx(s):
        s_clean = clean_xml_str(s)
        if s_clean not in ss_index:
            ss_index[s_clean] = len(shared_strings)
            shared_strings.append(s_clean)
        return ss_index[s_clean]

    sheet_xmls = []
    for sh in sheets:
        cols_xml = []
        for c_idx, w in enumerate(sh.get("col_widths", []), 1):
            cols_xml.append(f'<col min="{c_idx}" max="{c_idx}" width="{w}" customWidth="1"/>')
        cols_block = f"<cols>{''.join(cols_xml)}</cols>" if cols_xml else ""

        if sh.get("freeze_header", True):
            views_block = (
                '<sheetViews><sheetView workbookViewId="0">'
                '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
                '</sheetView></sheetViews>'
            )
        else:
            views_block = '<sheetViews><sheetView workbookViewId="0"/></sheetViews>'

        rows_xml = []
        rows_data = sh.get("rows", [])
        max_col = 0
        for r_idx, row in enumerate(rows_data, 1):
            cells_xml = []
            max_lines = 1
            for c_idx, cell in enumerate(row):
                max_col = max(max_col, c_idx)
                if isinstance(cell, tuple):
                    val, style_id = cell
                else:
                    val, style_id = cell, 0
                val_str = clean_xml_str(val)
                if val_str:
                    # Estimate wrapped line count for comfortable row height
                    col_w = sh.get("col_widths", [40])[min(c_idx, len(sh.get("col_widths", [40])) - 1)]
                    est_lines = sum(max(1, (len(line) * (1.7 if any(ord(ch) > 0x2E80 for ch in line) else 1.0)) // max(10, col_w - 3) + 1) for line in val_str.split("\n"))
                    max_lines = max(max_lines, int(est_lines))
                s_idx = get_ss_idx(val_str)
                ref = cell_ref(r_idx, c_idx)
                cells_xml.append(f'<c r="{ref}" s="{style_id}" t="s"><v>{s_idx}</v></c>')

            if r_idx == 1 and sh.get("freeze_header", True):
                ht_attr = ' ht="28" customHeight="1"'
            else:
                ht = min(220, max(20, max_lines * 15 + 6))
                ht_attr = f' ht="{ht}" customHeight="1"'
            rows_xml.append(f'<row r="{r_idx}"{ht_attr}>{"".join(cells_xml)}</row>')

        af_block = ""
        if sh.get("auto_filter", False) and rows_data:
            last_ref = cell_ref(len(rows_data), max_col)
            af_block = f'<autoFilter ref="A1:{last_ref}"/>'

        ws_xml = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            f'<worksheet xmlns="{NS_MAIN}" xmlns:r="{NS_REL_DOC}">'
            f'{views_block}'
            f'{cols_block}'
            f'<sheetData>{"".join(rows_xml)}</sheetData>'
            f'{af_block}'
            '</worksheet>'
        )
        sheet_xmls.append(ws_xml)

    # Build sharedStrings.xml
    ss_items = []
    for s in shared_strings:
        pres = ' xml:space="preserve"' if (s.startswith(" ") or s.endswith(" ") or "\n" in s or "\t" in s) else ""
        ss_items.append(f"<si><t{pres}>{xml_escape(s)}</t></si>")
    ss_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<sst xmlns="{NS_MAIN}" count="{len(shared_strings)}" uniqueCount="{len(shared_strings)}">'
        f'{"".join(ss_items)}'
        '</sst>'
    )

    styles_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="4">
    <font><sz val="10.5"/><color rgb="FF0F172A"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
    <font><sz val="9.5"/><color rgb="FF475569"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FF145943"/><name val="Calibri"/></font>
  </fonts>
  <fills count="7">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF145943"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF8FAFC"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFEFCE8"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFECFDF5"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFCBD5E1"/></left>
      <right style="thin"><color rgb="FFCBD5E1"/></right>
      <top style="thin"><color rgb="FFCBD5E1"/></top>
      <bottom style="thin"><color rgb="FFCBD5E1"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="7">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
  </cellXfs>
</styleSheet>'''

    wb_sheets = []
    wb_rels = []
    ct_overrides = [
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
        '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>',
    ]

    for idx, sh in enumerate(sheets, 1):
        safe_name = xml_escape(sh["name"][:31])
        wb_sheets.append(f'<sheet name="{safe_name}" sheetId="{idx}" r:id="rId{idx}"/>')
        wb_rels.append(
            f'<Relationship Id="rId{idx}" '
            f'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
            f'Target="worksheets/sheet{idx}.xml"/>'
        )
        ct_overrides.append(
            f'<Override PartName="/xl/worksheets/sheet{idx}.xml" '
            f'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )

    wb_rels.append(
        f'<Relationship Id="rId{len(sheets)+1}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    )
    wb_rels.append(
        f'<Relationship Id="rId{len(sheets)+2}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>'
    )

    workbook_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<workbook xmlns="{NS_MAIN}" xmlns:r="{NS_REL_DOC}">'
        f'<sheets>{"".join(wb_sheets)}</sheets>'
        '</workbook>'
    )
    workbook_rels_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<Relationships xmlns="{NS_REL_PKG}">{"".join(wb_rels)}</Relationships>'
    )
    root_rels_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<Relationships xmlns="{NS_REL_PKG}">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '</Relationships>'
    )
    content_types_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        f'{"".join(ct_overrides)}'
        '</Types>'
    )

    with zipfile.ZipFile(filepath, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml)
        zf.writestr("_rels/.rels", root_rels_xml)
        zf.writestr("xl/workbook.xml", workbook_xml)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml)
        zf.writestr("xl/styles.xml", styles_xml)
        zf.writestr("xl/sharedStrings.xml", ss_xml)
        for idx, ws_xml in enumerate(sheet_xmls, 1):
            zf.writestr(f"xl/worksheets/sheet{idx}.xml", ws_xml)


def _extract_si_text(si_elem):
    """
    Extracts plain text from <si> or <is> element while explicitly ignoring
    Japanese Excel phonetic furigana <rPh> elements.
    """
    parts = []
    for child in si_elem:
        tag = child.tag.split("}")[-1]
        if tag == "t":
            parts.append(child.text or "")
        elif tag == "r":
            for sub in child:
                if sub.tag.split("}")[-1] == "t":
                    parts.append(sub.text or "")
        # Ignore <rPh> and <phoneticPr>
    return "".join(parts)


def read_xlsx(filepath):
    """
    Reads an .xlsx workbook and returns Ordered dict:
      { sheet_name: [ {header_col: cell_str, ...}, ... ] }
    """
    result = {}
    with zipfile.ZipFile(filepath, "r") as zf:
        names = set(zf.namelist())
        shared_strings = []
        if "xl/sharedStrings.xml" in names:
            ss_root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in ss_root:
                if si.tag.split("}")[-1] == "si":
                    shared_strings.append(_extract_si_text(si))

        wb_root = ET.fromstring(zf.read("xl/workbook.xml"))
        rels_root = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
        rel_map = {}
        for rel in rels_root:
            rid = rel.attrib.get("Id")
            target = rel.attrib.get("Target", "").lstrip("/")
            if not target.startswith("xl/"):
                target = "xl/" + target
            rel_map[rid] = target

        sheets_elem = wb_root.find(f"{{{NS_MAIN}}}sheets")
        if sheets_elem is None:
            return result

        for sh in sheets_elem:
            sh_name = sh.attrib.get("name", "")
            rid = sh.attrib.get(f"{{{NS_REL_DOC}}}id") or sh.attrib.get("r:id")
            ws_path = rel_map.get(rid, "")
            if ws_path not in names:
                continue

            ws_root = ET.fromstring(zf.read(ws_path))
            sheet_data = ws_root.find(f"{{{NS_MAIN}}}sheetData")
            if sheet_data is None:
                continue

            raw_rows = []
            for row_el in sheet_data:
                if row_el.tag.split("}")[-1] != "row":
                    continue
                row_vals = {}
                max_c = -1
                for c_el in row_el:
                    if c_el.tag.split("}")[-1] != "c":
                        continue
                    ref = c_el.attrib.get("r", "A1")
                    c_idx = col_index_from_ref(ref)
                    max_c = max(max_c, c_idx)
                    c_type = c_el.attrib.get("t", "")
                    val = ""
                    if c_type == "s":
                        v_el = c_el.find(f"{{{NS_MAIN}}}v")
                        if v_el is not None and v_el.text is not None:
                            s_i = int(v_el.text.strip())
                            if 0 <= s_i < len(shared_strings):
                                val = shared_strings[s_i]
                    elif c_type == "inlineStr":
                        is_el = c_el.find(f"{{{NS_MAIN}}}is")
                        if is_el is not None:
                            val = _extract_si_text(is_el)
                    else:
                        v_el = c_el.find(f"{{{NS_MAIN}}}v")
                        if v_el is not None and v_el.text is not None:
                            val = v_el.text
                    row_vals[c_idx] = val
                if max_c >= 0:
                    raw_rows.append([row_vals.get(i, "") for i in range(max_c + 1)])

            if not raw_rows:
                result[sh_name] = []
                continue

            headers = [h.strip() for h in raw_rows[0]]
            dict_rows = []
            for r in raw_rows[1:]:
                d = {}
                for idx, h in enumerate(headers):
                    if h:
                        d[h] = r[idx] if idx < len(r) else ""
                dict_rows.append(d)
            result[sh_name] = dict_rows

    return result

