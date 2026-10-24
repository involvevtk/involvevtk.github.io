/* Involve - renders events from js/events-data.js. Works on any static server. */
(function () {
  "use strict";
  var all = (window.INVOLVE_EVENTS || []).slice();
  all.sort(function (a, b) { return String(b.eventDate).localeCompare(String(a.eventDate)); });

  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return iso || "";
    return parseInt(m[3], 10) + " " + MONTHS[parseInt(m[2], 10) - 1] + " " + m[1];
  }
  function isUpcoming(iso) {
    var d = new Date(iso + "T23:59:59");
    return !isNaN(d) && d.getTime() >= Date.now();
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function card(ev) {
    var li = el("li", "event-card");
    var fig = el("div", "event-media");
    var img = el("img");
    img.src = ev.bannerImage;
    img.alt = ev.title + " - banner image";
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 800; img.height = 420;
    fig.appendChild(img);
    li.appendChild(fig);

    var body = el("div", "event-body");
    var meta = el("p", "event-meta");
    var t = el("time", null, fmtDate(ev.eventDate));
    t.setAttribute("datetime", ev.eventDate);
    meta.appendChild(t);
    if (isUpcoming(ev.eventDate)) meta.appendChild(el("span", "badge badge-upcoming", "Upcoming"));
    if (ev.sample) meta.appendChild(el("span", "badge badge-sample", "Sample"));
    body.appendChild(meta);
    body.appendChild(el("h3", "event-title", ev.title));
    body.appendChild(el("p", "event-desc", ev.description));
    if (ev.readMoreLink) {
      var a = el("a", "btn btn-small btn-outline", "Read more");
      a.href = ev.readMoreLink;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "Read more about " + ev.title + " (opens in a new tab)");
      body.appendChild(a);
    }
    li.appendChild(body);
    return li;
  }

  function render(list, items) {
    list.textContent = "";
    items.forEach(function (ev) { list.appendChild(card(ev)); });
  }

  /* Home page teaser: featured events only (falls back to latest if none are featured). */
  var teaser = document.getElementById("events-teaser");
  if (teaser) {
    var featured = all.filter(function (e) { return e.featured; });
    if (!featured.length) featured = all;
    render(teaser, featured.slice(0, 4));
    if (!featured.length) teaser.parentNode.hidden = true;
  }

  /* Events page: all events with year filter. */
  var list = document.getElementById("events-list");
  if (list) {
    var filters = document.getElementById("events-filters");
    var empty = document.getElementById("events-empty");
    var years = [];
    all.forEach(function (e) {
      var y = String(e.eventDate).slice(0, 4);
      if (years.indexOf(y) < 0) years.push(y);
    });
    var current = "all";
    function show() {
      var items = current === "all" ? all : all.filter(function (e) { return String(e.eventDate).slice(0, 4) === current; });
      render(list, items);
      if (empty) empty.hidden = items.length > 0;
      if (filters) filters.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.year === current ? "true" : "false");
      });
    }
    if (filters && years.length > 1) {
      ["all"].concat(years).forEach(function (y) {
        var b = el("button", "chip", y === "all" ? "All" : y);
        b.type = "button";
        b.dataset.year = y;
        b.addEventListener("click", function () { current = y; show(); });
        filters.appendChild(b);
      });
    }
    show();
  }
})();
