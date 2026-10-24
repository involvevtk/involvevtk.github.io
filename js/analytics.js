/*
 * Involve - Google Analytics 4 (page views + simple click tracking).
 * The Measurement ID lives in data/site.json -> "analytics" -> "measurementId".
 * Leave it empty ("") to switch tracking off. Tracking only runs on the live
 * domains listed in "hosts", never on localhost or previews.
 *
 * Events sent: page_view (automatic), click_call, click_whatsapp, click_email,
 * click_social (with the network name), click_outbound (any other external link).
 */
export function initAnalytics(site) {
  const cfg = site && site.analytics;
  if (!cfg || !cfg.measurementId) return;
  if (!(cfg.hosts || []).includes(location.hostname)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.measurementId);
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", cfg.measurementId, { anonymize_ip: true });

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    let name = null;
    const params = { link_url: a.href, page_path: location.pathname };
    if (href.startsWith("tel:")) name = "click_call";
    else if (href.startsWith("mailto:")) name = "click_email";
    else if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)/i.test(href)) name = "click_whatsapp";
    else if (/^https?:\/\//i.test(href) && new URL(href).origin !== location.origin) {
      const host = new URL(href).hostname.replace(/^www\./, "");
      const net = ["facebook", "instagram", "youtube", "linkedin", "twitter", "x.com"].find((n) => host.includes(n));
      if (net) { name = "click_social"; params.network = net; } else name = "click_outbound";
    }
    if (name) window.gtag("event", name, params);
  });
}
