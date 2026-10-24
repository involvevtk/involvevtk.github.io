/* Home: souvenir magazine link (data/site.json "souvenir" + data/home.json "magazine"). */
import { el, url, link, reveal } from "../core.js";

export function renderMagazine(main, home, site) {
  const m = home.magazine, sv = site.souvenir;
  if (!sv || !sv.url) return;
  const s = el("section", "section");
  const wrap = el("div", "wrap split split-magazine");
  const cover = link(sv.url, "", "magazine-cover");
  cover.setAttribute("aria-label", sv.title + " (opens in a new tab)");
  cover.appendChild(el("img", null, null, { src: url(sv.cover), alt: m.coverAlt || sv.title, width: 480, height: 640, loading: "lazy", decoding: "async" }));
  wrap.appendChild(reveal(cover, 0));
  const text = el("div", "split-text");
  text.appendChild(reveal(el("p", "eyebrow", m.eyebrow), 0));
  text.appendChild(reveal(el("h2", null, sv.title), 1));
  text.appendChild(reveal(el("p", null, m.text), 2));
  text.appendChild(reveal(link(sv.url, m.buttonLabel, "btn btn-outline"), 3));
  wrap.appendChild(text);
  s.appendChild(wrap);
  main.appendChild(s);
}
