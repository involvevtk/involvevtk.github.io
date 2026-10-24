/* Involve - the sun / moon button in the header. Saves the choice in a cookie. */
import { el } from "./core.js?v=202610242046";

const NS = "http://www.w3.org/2000/svg";
/* Inline SVG (no external sprite) so the icon always shows, in every browser. */
function glyph(cls, markup) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "icon " + cls);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  markup.forEach(([tag, attrs]) => {
    const n = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach((k) => n.setAttribute(k, attrs[k]));
    svg.appendChild(n);
  });
  return svg;
}

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.cookie = "involve-theme=" + theme + "; max-age=31536000; path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  const tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.setAttribute("content", theme === "dark" ? "#121212" : "#ffffff");
}

export function themeToggle() {
  const btn = el("button", "theme-toggle", null, { type: "button", "aria-label": "Switch to dark theme", title: "Switch theme" });
  btn.appendChild(glyph("icon-moon", [["path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z", fill: "currentColor" }]]));
  btn.appendChild(glyph("icon-sun", [
    ["circle", { cx: 12, cy: 12, r: 4.2, fill: "currentColor" }],
    ["path", { d: "M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", fill: "none" }],
  ]));
  const sync = () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  };
  btn.addEventListener("click", () => {
    apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    sync();
  });
  sync();
  return btn;
}
