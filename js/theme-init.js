/*
 * Involve - theme: applied before the page paints so there is no flash.
 * The visitor's choice is kept in a cookie ("involve-theme" = light | dark, 1 year).
 * With no cookie yet, the device setting (prefers-color-scheme) is used.
 */
(function () {
  var m = document.cookie.match(/(?:^|; )involve-theme=(light|dark)/);
  var theme = m ? m[1] : (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  var tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.setAttribute("content", theme === "dark" ? "#121212" : "#ffffff");
})();
