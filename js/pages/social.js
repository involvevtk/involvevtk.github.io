/* Social media links page. Links: data/social.json; page heading: "socialPage" in data/site.json */
import { runPage, pageTitle } from "../layout.js?v=202610242046";
import { el, link, icon, reveal } from "../core.js?v=202610242046";

runPage("social", async ({ site, social, main }) => {
  const sp = site.socialPage;
  pageTitle(main, sp.eyebrow, sp.title, sp.intro, site);
  const s = el("section", "section section-flush");
  const wrap = el("div", "wrap");
  const ul = el("ul", "social-list");
  social.forEach((item, i) => {
    const li = el("li");
    const a = link(item.url, "", "social-link");
    a.setAttribute("aria-label", item.label + (item.handle ? ", " + item.handle : "") + " (opens in a new tab)");
    a.appendChild(icon(item.id));
    a.appendChild(el("span", "social-name", item.label));
    if (item.handle) a.appendChild(el("span", "social-handle", item.handle));
    a.appendChild(el("span", "social-arrow", "\u2197", { "aria-hidden": "true" }));
    li.appendChild(a);
    ul.appendChild(reveal(li, Math.min(i, 4)));
  });
  wrap.appendChild(ul);
  s.appendChild(wrap);
  main.appendChild(s);
  return { seo: sp.seo };
});
