/* Involve - shared behaviour: mobile menu, contact buttons, forest video. No dependencies. */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-header")) setOpen(false);
    });
  }

  /* ---------- Office phone (single source: js/config.js) ---------- */
  var cfg = window.INVOLVE_CONFIG || {};
  var phone = String(cfg.PHONE || "").replace(/[\s-]/g, "");
  var valid = /^\+\d{8,15}$/.test(phone);
  var pretty = valid ? phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2 $3") : "";

  document.querySelectorAll("[data-call]").forEach(function (a) {
    if (valid) a.setAttribute("href", "tel:" + phone);
    else {
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("href", "#contact");
      a.classList.add("is-disabled");
    }
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    if (valid) {
      var msg = encodeURIComponent(cfg.WHATSAPP_MESSAGE || "Hello Involve!");
      a.setAttribute("href", "https://wa.me/" + phone.replace("+", "") + "?text=" + msg);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    } else {
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("href", "#contact");
      a.classList.add("is-disabled");
    }
  });
  document.querySelectorAll("[data-phone-text]").forEach(function (el) {
    el.textContent = valid ? pretty : "Office number coming soon";
  });
  document.querySelectorAll("[data-phone-link]").forEach(function (a) {
    if (valid) {
      a.setAttribute("href", "tel:" + phone);
      a.textContent = pretty;
    } else {
      a.removeAttribute("href");
      a.textContent = "Office number coming soon";
    }
  });
  document.querySelectorAll("[data-phone-hide-if-missing]").forEach(function (el) {
    if (!valid) el.hidden = true;
  });

  /* ---------- Forest teaser video: play only when it is cheap to do so ---------- */
  var fv = document.getElementById("forest-video");
  if (fv) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var conn = navigator.connection || {};
    var lite = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
    var wide = window.matchMedia && window.matchMedia("(min-width: 768px)").matches;
    if (!reduce && !lite && wide) {
      fv.preload = "metadata";
      var p = fv.play();
      if (p && p.catch) p.catch(function () {});
    }
  }
})();
