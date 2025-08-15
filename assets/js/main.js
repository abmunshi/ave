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

  // FAQ Nav Scroll & Active Link
  const navLinks = document.querySelectorAll(".faq-nav a");
  const sections = Array.from(
    document.querySelectorAll(".faq-type [data-type]")
  ).map((h2) => h2.parentElement);

  // Scroll to section on click
  navLinks.forEach((link, idx) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = sections[idx];
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 110; // Offset for sticky header
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // Highlight active link on scroll
  function onScroll() {
    let scrollPos = window.scrollY + 130; // Offset for sticky header
    let activeIdx = 0;
    sections.forEach((section, idx) => {
      if (section.offsetTop <= scrollPos) {
        activeIdx = idx;
      }
    });
    navLinks.forEach((link, idx) => {
      link.classList.toggle("active", idx === activeIdx);
    });
  }

  if (navLinks.length && sections.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});
