/* Home: "Who We Are" + Our Story / Mission / Vision (data/about.json). */
import { el, url, reveal, section, para } from "../core.js?v=202610242039";

export function renderAbout(main, about, site) {
  const { section: s, wrap } = section({ id: "about" });

  const head = el("div", "about-head");
  head.appendChild(reveal(el("p", "eyebrow", about.eyebrow), 0));
  head.appendChild(reveal(el("h2", null, about.title), 1));
  head.appendChild(reveal(para(about.intro, site, "pullquote"), 2));
  wrap.appendChild(head);

  const list = el("ol", "story");
  about.cards.forEach((c, i) => {
    const li = el("li", "story-row");
    const body = el("div", "story-body");
    body.appendChild(el("span", "story-num", String(i + 1).padStart(2, "0"), { "aria-hidden": "true" }));
    body.appendChild(el("h3", null, c.title));
    body.appendChild(el("p", null, c.text));
    li.appendChild(reveal(body, 1));
    const fig = el("div", "story-media");
    fig.appendChild(el("img", null, null, { src: url(c.image), alt: c.imageAlt || c.title, width: 960, height: 720, loading: "lazy", decoding: "async" }));
    li.appendChild(reveal(fig, 2));
    list.appendChild(li);
  });
  wrap.appendChild(list);
  main.appendChild(s);
}
