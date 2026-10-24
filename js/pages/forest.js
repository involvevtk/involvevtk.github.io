/* Involve Forest page. Content: data/forest.json (Malayalam text + English summary) */
import { runPage, pageTitle } from "../layout.js?v=202610242042";
import { loadJSON, el, button, reveal } from "../core.js?v=202610242042";

runPage("forest", async ({ site, main }) => {
  const f = await loadJSON("forest");
  pageTitle(main, f.eyebrow, f.title, null, site);

  const s = el("section", "section section-flush");
  const wrap = el("div", "wrap wrap-narrow");
  const sum = el("div", "summary");
  sum.appendChild(reveal(el("p", "label", f.summaryTitle), 0));
  sum.appendChild(reveal(el("p", "pullquote", f.summary), 1));
  wrap.appendChild(sum);

  const text = el("div", "forest-text", null, { lang: f.textLang || "ml" });
  f.paragraphs.forEach((p, i) => text.appendChild(reveal(el("p", null, p), Math.min(i, 2))));
  text.appendChild(reveal(el("p", "signoff", f.signoff), 1));
  wrap.appendChild(text);

  const row = el("div", "btn-row");
  (f.actions || []).forEach((a) => row.appendChild(button(a)));
  wrap.appendChild(reveal(row, 1));
  s.appendChild(wrap);
  main.appendChild(s);
  return { seo: f.seo };
});
