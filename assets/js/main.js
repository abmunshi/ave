import "./accordion.js";

// Sticky header scroll effect
window.addEventListener("scroll", function () {
  var header = document.getElementById("mainHeader");
  if (window.scrollY > 10) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Mobile menu toggle with single overlay
document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.querySelector(".mobile-menu-btn");
  var offcanvas = document.querySelector(".offcanvas-menu");
  var overlay = document.querySelector(".offcanvas-overlay");
  function closeMenu() {
    offcanvas.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    overlay.classList.remove("open");
  }
  if (menuBtn && offcanvas && overlay) {
    menuBtn.addEventListener("click", function () {
      var isOpen = offcanvas.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      overlay.classList.toggle("open", isOpen);
    });
    overlay.addEventListener("click", closeMenu);
  }
});
