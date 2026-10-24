/* Events page. Content: data/events.json */
import { runPage, pageTitle } from "../layout.js?v=202610242100";
import { loadJSON, el } from "../core.js?v=202610242100";
import { sortedEvents, renderEventList } from "../render/events.js?v=202610242100";

runPage("events", async ({ site, main }) => {
  const data = await loadJSON("events");
  const all = sortedEvents(data.events);
  pageTitle(main, data.page.eyebrow, data.page.title, data.page.intro, site);

  const s = el("section", "section section-flush");
  const wrap = el("div", "wrap");
  const years = [];
  all.forEach((e) => { const y = String(e.eventDate).slice(0, 4); if (!years.includes(y)) years.push(y); });
  const tabs = el("div", "tabs", null, { role: "group", "aria-label": "Filter by year" });
  const list = el("ol", "event-list");
  const empty = el("p", "empty", data.page.emptyText || "No events to show yet.");
  empty.hidden = all.length > 0;
  let current = "all";

  function show() {
    const items = current === "all" ? all : all.filter((e) => String(e.eventDate).slice(0, 4) === current);
    renderEventList(list, items);
    empty.hidden = items.length > 0;
    tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.year === current)));
  }
  if (years.length > 1) {
    ["all"].concat(years).forEach((y) => {
      const b = el("button", "tab", y === "all" ? "All" : y, { type: "button", "data-year": y });
      b.addEventListener("click", () => { current = y; show(); requestAnimationFrame(() => list.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-visible"))); });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);
  }
  wrap.appendChild(list);
  wrap.appendChild(empty);
  s.appendChild(wrap);
  main.appendChild(s);
  show();
  return { seo: data.seo };
});
