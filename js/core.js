/*
 * Involve - core helpers shared by every page (no dependencies, no build step).
 *  - BASE: the site root, worked out from this file's own location, so the same
 *    code works at the root of GitHub Pages, in a sub-folder, from the local
 *    python server and on the 404 page.
 *  - loadJSON(): fetches a file from /data
 *  - el(), richText(), icon(): tiny DOM helpers (text is always inserted with
 *    textContent, never innerHTML, so content files cannot inject HTML).
 */
export const BASE = new URL("../", import.meta.url);

/** Turn a site-relative path ("assets/x.png") into a full URL. Full URLs/mailto/tel/#hash pass through. */
export function url(path) {
  if (!path) return "";
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  return new URL(path, BASE).href;
}

const cache = new Map();
/** Fetch and parse data/<name>.json (cached). */
export function loadJSON(name) {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(url("data/" + name + ".json"), { cache: "no-cache" }).then((r) => {
        if (!r.ok) throw new Error(name + ".json: HTTP " + r.status);
        return r.json().catch(() => {
          throw new Error(name + ".json is not valid JSON (check commas and quotes)");
        });
      })
    );
  }
  return cache.get(name);
}

/** Create an element: el("p", "class-name", "text", {attr: value}) */
export function el(tag, cls, text, attrs) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null && text !== "") e.textContent = text;
  if (attrs) for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
  return e;
}

/** Remove all children and return the node. */
export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
  return node;
}

/** SVG icon from assets/icons/sprite.svg */
export function icon(name, cls) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", cls || "icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(NS, "use");
  use.setAttribute("href", url("assets/icons/sprite.svg") + "#" + name);
  svg.appendChild(use);
  return svg;
}

/** Make an <a>. External (http...) links open in a new tab. */
export function link(href, label, cls) {
  const a = el("a", cls, label);
  a.href = url(href);
  if (/^https?:\/\//i.test(href) && new URL(href).origin !== location.origin) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}

/* ---------- Phone / email helpers (single source: data/site.json) ---------- */
export function phoneInfo(site) {
  const raw = String(site.phone || "").replace(/[\s-]/g, "");
  const valid = /^\+\d{8,15}$/.test(raw);
  return {
    valid,
    tel: valid ? "tel:" + raw : "",
    whatsapp: valid
      ? "https://wa.me/" + raw.slice(1) + "?text=" + encodeURIComponent(site.whatsappMessage || "Hello Involve!")
      : "",
    pretty: valid ? raw.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2 $3") : "",
  };
}

/**
 * Simple text format used in the data files:
 *   [label](address)   link          **text**   bold
 *   {{email}}          the office email (linked)
 *   {{phone}}          the office phone (linked) or "Office number coming soon"
 * Returns a DocumentFragment.
 */
export function richText(str, site) {
  const frag = document.createDocumentFragment();
  const ph = site ? phoneInfo(site) : { valid: false };
  str = String(str == null ? "" : str);
  if (site) {
    str = str.replace(/\{\{email\}\}/g, "[" + site.email + "](mailto:" + site.email + ")");
    str = str.replace(/\{\{phone\}\}/g, ph.valid ? "[" + ph.pretty + "](" + ph.tel + ")" : "our office number (coming soon)");
  }
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) frag.appendChild(document.createTextNode(str.slice(last, m.index)));
    if (m[1]) frag.appendChild(link(m[2], m[1]));
    else frag.appendChild(el("strong", null, m[3]));
    last = re.lastIndex;
  }
  if (last < str.length) frag.appendChild(document.createTextNode(str.slice(last)));
  return frag;
}

/** A <p> built with richText. */
export function para(str, site, cls) {
  const p = el("p", cls);
  p.appendChild(richText(str, site));
  return p;
}

/** A button-style link: style = solid | outline */
export function button(b) {
  return link(b.href, b.label, "btn btn-" + (b.style || "solid"));
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? parseInt(m[3], 10) + " " + MONTHS[parseInt(m[2], 10) - 1] + " " + m[1] : iso || "";
}

/** Section scaffold: <section class="section ..."><div class="wrap">…</div></section> */
export function section(opts) {
  const s = el("section", "section" + (opts.cls ? " " + opts.cls : ""));
  if (opts.id) s.id = opts.id;
  const w = el("div", "wrap");
  s.appendChild(w);
  return { section: s, wrap: w };
}

/** Section heading block: eyebrow + h2 (+ intro paragraph) */
export function sectionHead(eyebrow, title, intro, site) {
  const h = el("div", "section-head");
  if (eyebrow) h.appendChild(el("p", "eyebrow", eyebrow));
  h.appendChild(el("h2", null, title));
  if (intro) h.appendChild(para(intro, site, "section-intro"));
  return h;
}

/** Mark an element for the scroll-reveal animation (js/motion.js). order = stagger step 0-6. */
export function reveal(node, order) {
  node.classList.add("reveal");
  if (order) node.style.setProperty("--d", order);
  return node;
}
