/* 404 page (served by GitHub Pages for unknown addresses). Paths are resolved from the script location, so it works at any URL depth. */
import { runPage } from "../layout.js?v=202610242042";
import { el, link, reveal } from "../core.js?v=202610242042";

runPage("", async ({ main }) => {
  const s = el("section", "notfound");
  const w = el("div", "wrap wrap-narrow");
  w.appendChild(reveal(el("p", "notfound-code", "404", { "aria-hidden": "true" }), 0));
  w.appendChild(reveal(el("h1", null, "Page not found"), 1));
  w.appendChild(reveal(el("p", "lead", "Sorry, we could not find the page you were looking for."), 2));
  w.appendChild(reveal(link("./", "Go back to home", "btn btn-solid"), 3));
  s.appendChild(w);
  main.appendChild(s);
  return { seo: { title: "Page not found | Involve", description: "Page not found." } };
});
