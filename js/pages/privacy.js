/* Privacy & Terms page. Content: data/privacy.json */
import { runPage, pageTitle } from "../layout.js?v=202610242042";
import { loadJSON, el, para, reveal } from "../core.js?v=202610242042";

runPage("privacy", async ({ site, main }) => {
  const p = await loadJSON("privacy");
  pageTitle(main, null, p.title, p.updated, site);
  const s = el("section", "section section-flush");
  const wrap = el("div", "wrap");
  p.sections.forEach((sec) => {
    const row = el("div", "doc-row");
    row.appendChild(el("h2", null, sec.heading));
    const body = el("div", "doc-body");
    (sec.paragraphs || []).forEach((t) => body.appendChild(para(t, site)));
    if (sec.list) {
      const list = el(sec.ordered ? "ol" : "ul", "doc-list");
      sec.list.forEach((t) => list.appendChild(el("li", null, t)));
      if (sec.collapsible) {
        const d = el("details");
        d.appendChild(el("summary", null, sec.collapsible));
        d.appendChild(list);
        body.appendChild(d);
      } else body.appendChild(list);
    }
    row.appendChild(body);
    wrap.appendChild(reveal(row, 0));
  });
  s.appendChild(wrap);
  main.appendChild(s);
  return { seo: p.seo };
});
