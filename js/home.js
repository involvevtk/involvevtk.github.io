"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded");
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems);
});