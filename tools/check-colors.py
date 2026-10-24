#!/usr/bin/env python3
"""
Involve - colour check. Fails if a CSS file writes a colour (#hex, rgb(), rgba(),
hsl()) anywhere except the two variable blocks at the top of css/base.css
(:root and html[data-theme="dark"]). Everything else must use var(--name), so both
themes always stay in step.      Run:  python3 tools/check-colors.py
"""
import re, glob, os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
col = re.compile(r'#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(')
bad = 0
for path in sorted(glob.glob(os.path.join(root, "css", "*.css"))):
    src = open(path, encoding="utf-8").read()
    if path.endswith("base.css"):  # drop the two variable blocks
        src = re.sub(r':root\s*\{.*?\n\}', '', src, count=1, flags=re.S)
        src = re.sub(r'html\[data-theme="dark"\]\s*\{.*?\n\}', '', src, count=1, flags=re.S)
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    for n, line in enumerate(src.splitlines(), 1):
        if col.search(line):
            bad += 1
            print(f"{os.path.basename(path)}: {line.strip()[:110]}")
print("OK: all colours come from variables." if not bad else f"\n{bad} hard-coded colour(s) found. Move them into variables in css/base.css.")
sys.exit(1 if bad else 0)
