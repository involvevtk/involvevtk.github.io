/* Home: contact section. Details come from data/site.json; phone/WhatsApp appear only when a real number is set. */
import { el, link, icon, reveal, phoneInfo, para } from "../core.js?v=202610242100";
import { socialRow } from "../layout.js?v=202610242100";

export function renderContact(main, home, site, social) {
  const c = home.contact;
  const s = el("section", "section section-contact", null, { id: "contact" });
  const wrap = el("div", "wrap split split-contact");

  const head = el("div", "split-head");
  head.appendChild(reveal(el("p", "eyebrow", c.eyebrow), 0));
  head.appendChild(reveal(el("h2", null, c.title), 1));
  if (c.intro) head.appendChild(reveal(para(c.intro, site), 2));
  wrap.appendChild(head);

  const ph = phoneInfo(site);
  const dl = el("dl", "contact-list");
  const row = (label, node) => {
    const d = el("div", "contact-item");
    d.appendChild(el("dt", null, label));
    const dd = el("dd");
    dd.appendChild(node);
    d.appendChild(dd);
    dl.appendChild(d);
  };
  row("Email", link("mailto:" + site.email, site.email, "contact-big"));
  if (ph.valid) row("Phone", link(ph.tel, ph.pretty, "contact-big"));
  const addr = el("address");
  site.address.forEach((l, i) => { if (i) addr.appendChild(el("br")); addr.appendChild(document.createTextNode(l)); });
  addr.appendChild(el("br"));
  addr.appendChild(document.createTextNode("Reg. No. " + site.registrationNumber));
  row("Address", addr);
  row(c.followTitle || "Follow", socialRow(social, null, false));

  const right = el("div", "split-body");
  right.appendChild(dl);
  if (ph.valid) {
    const btns = el("div", "btn-row");
    const call = link(ph.tel, "", "btn btn-solid");
    call.appendChild(icon("phone")); call.appendChild(document.createTextNode(" Call"));
    const wa = link(ph.whatsapp, "", "btn btn-outline");
    wa.appendChild(icon("whatsapp")); wa.appendChild(document.createTextNode(" WhatsApp"));
    btns.appendChild(call); btns.appendChild(wa);
    right.appendChild(btns);
  }
  wrap.appendChild(reveal(right, 2));
  s.appendChild(wrap);
  main.appendChild(s);
}
