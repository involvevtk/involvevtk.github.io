/* Home: introduction video (data/home.json "video"). The file is loaded only when played. */
import { el, url, reveal, section } from "../core.js?v=202610242100";

export function renderVideo(main, home) {
  const v = home.video;
  const { section: s, wrap } = section({ cls: "section-paper", id: "video" });
  const grid = el("div", "split split-video");
  const head = el("div", "split-head");
  head.appendChild(reveal(el("p", "eyebrow", v.eyebrow), 0));
  head.appendChild(reveal(el("h2", null, v.title), 1));
  grid.appendChild(head);

  const frame = el("div", "video-frame");
  const video = el("video", null, null, { controls: "", playsinline: "", preload: "none", poster: url(v.poster) });
  video.appendChild(el("source", null, null, { src: url(v.src), type: "video/mp4" }));
  frame.appendChild(video);
  grid.appendChild(reveal(frame, 2));
  wrap.appendChild(grid);
  main.appendChild(s);
}
