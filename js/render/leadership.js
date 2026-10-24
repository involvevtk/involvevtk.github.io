/*
 * Home: office bearers (data/leadership.json).
 * The whole section stays hidden while the file is an empty list [].
 * Entry: { "name": "...", "role": "...", "photo": "assets/images/people/x.jpg" }   (photo optional)
 */
import { el, url, reveal } from "../core.js?v=202610242042";

export function renderLeadership(main, home, people) {
  if (!Array.isArray(people) || !people.length) return;
  const cfg = home.leadership;
  const s = el("section", "section section-paper", null, { id: "leadership" });
  const wrap = el("div", "wrap");
  const head = el("div", "list-head");
  const t = el("div");
  t.appendChild(reveal(el("p", "eyebrow", cfg.eyebrow), 0));
  t.appendChild(reveal(el("h2", null, cfg.title), 1));
  head.appendChild(t);
  wrap.appendChild(head);
  const ul = el("ul", "leaders");
  people.forEach((p, i) => {
    const li = el("li", "leader");
    if (p.photo) li.appendChild(el("img", null, null, { src: url(p.photo), alt: "Photo of " + p.name, width: 240, height: 240, loading: "lazy", decoding: "async" }));
    li.appendChild(el("h3", null, p.name));
    li.appendChild(el("p", "leader-role", p.role));
    ul.appendChild(reveal(li, Math.min(i, 3)));
  });
  wrap.appendChild(ul);
  s.appendChild(wrap);
  main.appendChild(s);
}
