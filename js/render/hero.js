/* Home: opening statement + three quiet facts. Text comes from data/home.json ("hero", "facts"). */
import { el, button, reveal, para } from "../core.js?v=202610242042";

export function renderHero(main, home, site) {
  const h = home.hero;
  const s = el("section", "hero");
  const w = el("div", "wrap");

  w.appendChild(reveal(el("p", "eyebrow", h.eyebrow), 0));
  w.appendChild(reveal(el("h1", "hero-title", h.title), 1));
  w.appendChild(reveal(el("p", "hero-sub", h.subtitle), 2));
  w.appendChild(reveal(para(h.text, site, "hero-text"), 3));
  const row = el("div", "btn-row");
  (h.buttons || []).forEach((b) => row.appendChild(button(b)));
  w.appendChild(reveal(row, 4));

  if (home.facts && home.facts.length) {
    const dl = el("dl", "facts");
    home.facts.forEach((f, i) => {
      const d = el("div");
      d.appendChild(el("dt", null, f.label));
      d.appendChild(el("dd", null, f.value));
      dl.appendChild(reveal(d, 3 + i));
    });
    w.appendChild(dl);
  }
  s.appendChild(w);
  main.appendChild(s);
}
