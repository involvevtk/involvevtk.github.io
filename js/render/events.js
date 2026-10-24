/* Events as a minimal dated list. Used by the Home teaser and the Events page (data/events.json). */
import { el, url, link, formatDate, reveal } from "../core.js";

export function sortedEvents(events) {
  return (events || []).slice().sort((a, b) => String(b.eventDate).localeCompare(String(a.eventDate)));
}

function isUpcoming(iso) {
  const d = new Date(iso + "T23:59:59");
  return !isNaN(d) && d.getTime() >= Date.now();
}

export function eventRow(ev, order) {
  const li = el("li", "event-row");
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ev.eventDate || "");
  const date = el("time", "event-date", null, { datetime: ev.eventDate });
  if (m) {
    date.appendChild(el("span", "event-day", String(parseInt(m[3], 10))));
    date.appendChild(el("span", "event-month", formatDate(ev.eventDate).split(" ").slice(1).join(" ")));
  } else {
    date.appendChild(el("span", "event-month", ev.eventDate || ""));
  }
  li.appendChild(date);

  const main = el("div", "event-main");
  const tags = el("p", "event-tags");
  if (isUpcoming(ev.eventDate)) tags.appendChild(el("span", "tag tag-upcoming", "Upcoming"));
  if (ev.sample) tags.appendChild(el("span", "tag", "Sample"));
  if (tags.childNodes.length) main.appendChild(tags);
  main.appendChild(el("h3", null, ev.title));
  main.appendChild(el("p", "event-desc", ev.description));
  if (ev.readMoreLink) {
    const a = link(ev.readMoreLink, "Read more", "arrow-link");
    a.setAttribute("aria-label", "Read more about " + ev.title + " (opens in a new tab)");
    main.appendChild(a);
  }
  li.appendChild(main);

  if (ev.bannerImage) {
    const fig = el("div", "event-thumb");
    fig.appendChild(el("img", null, null, { src: url(ev.bannerImage), alt: ev.title + " - banner image", width: 800, height: 520, loading: "lazy", decoding: "async" }));
    li.appendChild(fig);
  }
  return reveal(li, order || 0);
}

export function renderEventList(ul, events) {
  while (ul.firstChild) ul.removeChild(ul.firstChild);
  events.forEach((ev, i) => ul.appendChild(eventRow(ev, Math.min(i, 3))));
}

/** Home teaser section. */
export function renderEventsTeaser(main, home, eventsData) {
  const cfg = home.events;
  const all = sortedEvents(eventsData.events);
  let items = all.filter((e) => e.featured);
  if (!items.length) items = all;
  items = items.slice(0, cfg.maxItems || 3);
  if (!items.length) return;

  const s = el("section", "section section-paper", null, { id: "events" });
  const wrap = el("div", "wrap");
  const head = el("div", "list-head");
  const t = el("div");
  t.appendChild(reveal(el("p", "eyebrow", cfg.eyebrow), 0));
  t.appendChild(reveal(el("h2", null, cfg.title), 1));
  head.appendChild(t);
  head.appendChild(reveal(link("events", cfg.buttonLabel + " \u2192", "arrow-link"), 2));
  wrap.appendChild(head);
  const ul = el("ol", "event-list");
  renderEventList(ul, items);
  wrap.appendChild(ul);
  s.appendChild(wrap);
  main.appendChild(s);
}
