/* Home: Involve Forest teaser (data/home.json "forest"). Poster always; the muted loop plays only when cheap. */
import { el, url, link, reveal } from "../core.js?v=202610242042";

export function renderForestTeaser(main, home) {
  const f = home.forest;
  const s = el("section", "forest-band");
  const video = el("video", "forest-video", null, { muted: "", loop: "", playsinline: "", preload: "none", poster: url(f.poster), "aria-hidden": "true", tabindex: "-1" });
  video.muted = true;
  video.appendChild(el("source", null, null, { src: url(f.video), type: "video/mp4" }));
  s.appendChild(video);

  const wrap = el("div", "wrap forest-inner");
  wrap.appendChild(reveal(el("p", "eyebrow", f.eyebrow), 0));
  wrap.appendChild(reveal(el("h2", null, f.title), 1));
  wrap.appendChild(reveal(el("p", "forest-text-short", f.text), 2));
  wrap.appendChild(reveal(link(f.href, f.linkLabel + " \u2192", "arrow-link"), 3));
  s.appendChild(wrap);
  main.appendChild(s);

  // autoplay only when it is cheap: no reduced-motion, no data saver / 2g, wide screen
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = navigator.connection || {};
  const lite = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
  const wide = window.matchMedia && matchMedia("(min-width: 768px)").matches;
  if (!reduce && !lite && wide) {
    video.preload = "metadata";
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }
}
