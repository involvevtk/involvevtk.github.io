/* Home: Green Project teaser (data/home.json "green"). Plain section; the image is a neutral illustration. */
import { el, url, link, reveal, para } from "../core.js?v=202610242042";

export function renderGreenTeaser(main, home, site) {
  const g = home.green;
  const s = el("section", "section section-teaser");
  const wrap = el("div", "wrap split split-green");
  const text = el("div", "split-text");
  text.appendChild(reveal(el("p", "eyebrow", g.eyebrow), 0));
  text.appendChild(reveal(el("h2", null, g.title), 1));
  text.appendChild(reveal(para(g.text, site), 2));
  text.appendChild(reveal(link(g.href, g.buttonLabel, "btn btn-solid"), 3));
  wrap.appendChild(text);
  const art = el("div", "green-art");
  art.appendChild(el("img", null, null, { src: url(g.image), alt: g.imageAlt || "", width: 600, height: 600, loading: "lazy", decoding: "async" }));
  wrap.appendChild(reveal(art, 2));
  s.appendChild(wrap);
  main.appendChild(s);
}
