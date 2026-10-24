#!/usr/bin/env python3
"""
Involve - cache busting. Run this before every push:

    python3 tools/bump-version.py

It stamps a fresh version (?v=YYYYMMDDHHMM) on every CSS and JS link in the
HTML pages and on every import inside js/, so phones and browsers fetch the
newest files straight away instead of waiting for their cache to expire.
Content files in data/ are always fetched fresh and need nothing.
"""
import re, glob, time, os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ver = time.strftime("%Y%m%d%H%M")

html_re = re.compile(r'((?:href|src)="/?(?:css|js)/[^"?]+\.(?:css|js))(?:\?v=\w+)?(")')
js_re = re.compile(r'(\bfrom\s+"\.{1,2}/[^"?]+\.js)(?:\?v=\w+)?(")')

changed = 0
for path in glob.glob(os.path.join(root, "*.html")) + glob.glob(os.path.join(root, "js", "**", "*.js"), recursive=True):
    src = open(path, encoding="utf-8").read()
    rx = html_re if path.endswith(".html") else js_re
    out = rx.sub(lambda m: f"{m.group(1)}?v={ver}{m.group(2)}", src)
    if out != src:
        open(path, "w", encoding="utf-8").write(out)
        changed += 1
print(f"Version {ver} stamped on {changed} files.")
