/* Green Project page (information only). Content: data/green.json */
import { runPage, pageTitle } from "../layout.js";
import { loadJSON, el, url, para, button, reveal } from "../core.js";

runPage("green", async ({ site, main }) => {
  const g = await loadJSON("green");
  pageTitle(main, g.eyebrow, g.title, null, site);

  const s = el("section", "section section-flush");
  const wrap = el("div", "wrap split split-green");
  const art = el("div", "green-art");
  art.appendChild(el("img", null, null, { src: url(g.image), alt: g.imageAlt || "", width: 600, height: 600, decoding: "async" }));
  wrap.appendChild(reveal(art, 0));

  const text = el("div", "split-text prose");
  g.paragraphs.forEach((p) => text.appendChild(reveal(para(p, site, "lead-text"), 1)));
  wrap.appendChild(text);
  s.appendChild(wrap);
  main.appendChild(s);

  const s2 = el("section", "section section-rule");
  const w2 = el("div", "wrap split");
  const head = el("div", "split-head");
  head.appendChild(reveal(el("h2", null, g.listTitle), 0));
  w2.appendChild(head);
  const body = el("div", "split-body");
  const ol = el("ol", "plain-list");
  g.list.forEach((t, i) => ol.appendChild(reveal(el("li", null, t), Math.min(i + 1, 5))));
  body.appendChild(ol);
  (g.closing || []).forEach((c) => body.appendChild(reveal(para(c, site), 2)));
  const row = el("div", "btn-row");
  (g.actions || []).forEach((a) => row.appendChild(button(a)));
  body.appendChild(reveal(row, 3));
  w2.appendChild(body);
  s2.appendChild(w2);
  main.appendChild(s2);
  return { seo: g.seo };
});
