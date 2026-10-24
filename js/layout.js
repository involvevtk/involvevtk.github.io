/*
 * Involve - shared page frame: header, footer, mobile menu, SEO tags and the
 * runPage() wrapper every page script uses. Header, footer and navigation are
 * all built from data/site.json (and data/social.json), so they are edited in
 * one place and stay identical on every page.
 */
import { el, clear, icon, link, url, loadJSON, phoneInfo, para } from "./core.js?v=202610242046";
import { initMotion } from "./motion.js?v=202610242046";
import { initAnalytics } from "./analytics.js?v=202610242046";
import { themeToggle } from "./theme.js?v=202610242046";

/* ---------- SEO / social meta (HTML keeps static defaults; this refines them per page) ---------- */
function setMeta(selector, attr, value) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    const m = /\[(name|property)="([^"]+)"\]/.exec(selector);
    node.setAttribute(m[1], m[2]);
    document.head.appendChild(node);
  }
  node.setAttribute(attr, value);
}

function applySeo(site, seo, social) {
  seo = seo || site.seo || {};
  const title = seo.title || site.seo.title;
  const desc = seo.description || site.seo.description;
  document.title = title;
  setMeta('meta[name="description"]', "content", desc);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", desc);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", desc);
  const root = site.siteUrl.replace(/\/?$/, "/");
  const file = location.pathname.split("/").pop().replace(/\.html$/, "");
  const pageUrl = root + (file && file !== "index" ? file : "");
  if (!document.head.querySelector('meta[name="robots"][content*="noindex"]')) {
    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = pageUrl;
    setMeta('meta[property="og:url"]', "content", pageUrl);
  }
  const img = new URL(site.shareImage, root).href;
  setMeta('meta[property="og:image"]', "content", img);
  setMeta('meta[name="twitter:image"]', "content", img);

  // Organisation structured data (home page only)
  if (document.body.dataset.page === "home" && !document.getElementById("ld-org")) {
    const ld = {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: site.fullName,
      url: root,
      logo: new URL("assets/images/logo-512.png", root).href,
      email: site.email,
      foundingDate: site.foundingDate,
      address: { "@type": "PostalAddress", addressLocality: "Vatakara", addressRegion: "Kerala", addressCountry: "IN" },
      sameAs: (social || []).map((s) => s.url),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "ld-org";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
}

/* ---------- Header ---------- */
function renderHeader(site, activeKey) {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  clear(mount);
  mount.className = "site-header";
  const inner = el("div", "wrap header-inner");

  const brand = link("./", "", "brand");
  brand.setAttribute("aria-label", site.name + " - home");
  const logo = el("img", null, null, { src: url(site.logo), width: 40, height: 40, alt: "" });
  brand.appendChild(logo);
  brand.appendChild(el("span", "brand-name", site.name));
  inner.appendChild(brand);

  inner.appendChild(themeToggle());

  const toggle = el("button", "nav-toggle", null, {
    type: "button", "aria-expanded": "false", "aria-controls": "site-nav", "aria-label": "Open menu",
  });
  toggle.appendChild(el("span", "bars"));
  inner.appendChild(toggle);

  const nav = el("nav", "site-nav", null, { id: "site-nav", "aria-label": "Main" });
  const ul = el("ul");
  site.nav.forEach((item) => {
    const li = el("li");
    const a = link(item.href, item.label);
    if (item.key === activeKey) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  inner.appendChild(nav);
  mount.appendChild(inner);

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    mount.classList.toggle("nav-open", open);
    document.documentElement.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
  });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".site-header")) setOpen(false); });
}

/* ---------- Footer ---------- */
export function socialRow(social, site, withMail) {
  const ul = el("ul", "social-row", null, { "aria-label": "Involve on social media" });
  social.forEach((s) => {
    const li = el("li");
    const a = link(s.url, "");
    a.setAttribute("aria-label", s.label + " (opens in a new tab)");
    a.appendChild(icon(s.id));
    li.appendChild(a);
    ul.appendChild(li);
  });
  if (withMail && site) {
    const li = el("li");
    const a = link("mailto:" + site.email, "");
    a.setAttribute("aria-label", "Email " + site.email);
    a.appendChild(icon("mail"));
    li.appendChild(a);
    ul.appendChild(li);
  }
  return ul;
}

function renderFooter(site, social) {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  clear(mount);
  mount.className = "site-footer";
  const wrap = el("div", "wrap");
  const grid = el("div", "footer-grid");

  // Column 1: identity
  const c1 = el("div", "footer-col footer-brand");
  c1.appendChild(el("img", null, null, { src: url(site.logo), width: 56, height: 56, alt: site.name + " logo", loading: "lazy" }));
  c1.appendChild(el("p", "footer-name", site.name.toUpperCase()));
  c1.appendChild(el("p", "footer-org", site.orgType));
  c1.appendChild(el("p", "footer-reg", "Reg. No. " + site.registrationNumber));
  c1.appendChild(el("p", "footer-reg", "Affiliated to " + site.affiliation));
  grid.appendChild(c1);

  // Column 2: links
  const c2 = el("div", "footer-col");
  c2.appendChild(el("h2", "footer-title", site.footer.linksTitle));
  const ul = el("ul", "footer-links");
  site.nav.concat(site.footer.links).forEach((l) => {
    const li = el("li");
    li.appendChild(link(l.href, l.label));
    ul.appendChild(li);
  });
  c2.appendChild(ul);
  grid.appendChild(c2);

  // Column 3: contact
  const c3 = el("div", "footer-col");
  c3.appendChild(el("h2", "footer-title", site.footer.contactTitle));
  const addr = el("address");
  site.address.forEach((line) => { addr.appendChild(document.createTextNode(line)); addr.appendChild(el("br")); });
  addr.appendChild(link("mailto:" + site.email, site.email));
  const ph = phoneInfo(site);
  if (ph.valid) { addr.appendChild(el("br")); addr.appendChild(link(ph.tel, ph.pretty)); }
  c3.appendChild(addr);
  c3.appendChild(el("h2", "footer-title footer-title-sub", site.footer.connectTitle));
  c3.appendChild(socialRow(social, site, true));
  grid.appendChild(c3);

  wrap.appendChild(grid);
  wrap.appendChild(el("p", "copyright", "\u00A9 " + new Date().getFullYear() + " " + site.footer.copyright));
  mount.appendChild(wrap);
}

/* ---------- Common page pieces ---------- */
/** Page title band used by inner pages. */
export function pageTitle(main, eyebrow, title, intro, site) {
  const s = el("section", "page-title");
  const w = el("div", "wrap");
  if (eyebrow) w.appendChild(el("p", "eyebrow reveal", eyebrow));
  w.appendChild(el("h1", "reveal", title, { style: "--d:1" }));
  if (intro) w.appendChild(para(intro, site, "lead reveal")).style.setProperty("--d", 2);
  s.appendChild(w);
  main.appendChild(s);
  return s;
}

function showError(main, err, site) {
  console.error(err);
  const mail = site ? site.email : "office@involve.org.in";
  const box = el("div", "wrap load-error");
  box.appendChild(el("h1", null, "Sorry, this page could not load"));
  box.appendChild(el("p", null, "Please refresh the page. If the problem continues, email " + mail + "."));
  clear(main);
  main.appendChild(box);
}

/**
 * Every page script calls runPage(key, build).
 *   key    which nav item is highlighted (home, events, green, ...)
 *   build  async ({site, social, main}) => {...} adds this page's content to <main>
 *          and may return {seo} to set page-specific title/description.
 */
export async function runPage(key, build) {
  const main = document.getElementById("main");
  let site = null;
  try {
    site = await loadJSON("site");
    const social = await loadJSON("social");
    renderHeader(site, key);
    clear(main);
    const result = (await build({ site, social, main })) || {};
    applySeo(site, result.seo, social);
    renderFooter(site, social);
    initMotion();
    initAnalytics(site);
  } catch (err) {
    showError(main, err, site);
    if (site) { try { renderHeader(site, key); renderFooter(site, []); } catch (e) { /* ignore */ } }
  }
  document.documentElement.classList.add("is-ready");
  if (location.hash.length > 1) {
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) t.scrollIntoView();
  }
}
