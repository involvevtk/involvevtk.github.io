function initplugins() {
  var sidenav = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(sidenav);

  // activeate current page link :  white-text orange darken-2
  var navigations = document.querySelectorAll(
    "[href='" + window.location.pathname + "'][menu='nav']"
  );
  for (var i = 0; i < navigations.length; i++) {
    navigations[i].className =
      navigations[i].className + "white-text orange darken-2";
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.querySelectorAll("[w3-include-html]");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
        if (i == z.length - 1) {
          initplugins();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  if (z.length == 0) {
    initplugins();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  includeHTML();
  document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".parallax");
      var instances = M.Parallax.init(elems);
    });
});
