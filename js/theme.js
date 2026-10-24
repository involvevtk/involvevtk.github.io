/* Involve - the sun / moon button in the header. Saves the choice in a cookie. */
import { el, icon } from "./core.js?v=202610242039";

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.cookie = "involve-theme=" + theme + "; max-age=31536000; path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  const tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.setAttribute("content", theme === "dark" ? "#121212" : "#ffffff");
}

export function themeToggle() {
  const btn = el("button", "theme-toggle", null, { type: "button", "aria-label": "Switch to dark theme", title: "Switch theme" });
  btn.appendChild(icon("moon", "icon icon-moon"));
  btn.appendChild(icon("sun", "icon icon-sun"));
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
