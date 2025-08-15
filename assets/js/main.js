// Sticky header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 10);
  }
});

// Accordion logic (inlined from accordion.js)
class Accordion {
  constructor(root) {
    this.root = root;
    this.triggers = Array.from(
      root.querySelectorAll("[data-accordion-trigger]")
    );
    this.contents = Array.from(
      root.querySelectorAll("[data-accordion-content]")
    );
    this.init();
  }

  init() {
    this.triggers.forEach((trigger, idx) => {
      const content = this.contents[idx];
      const open = trigger.getAttribute("data-open") === "true";
      trigger.setAttribute("aria-expanded", open);
      content.setAttribute("aria-hidden", !open);
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.4s cubic-bezier(0.4,0,0.2,1)";
      if (open) {
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.classList.add("active");
      } else {
        content.style.maxHeight = "0px";
        trigger.classList.remove("active");
      }
      trigger.addEventListener("click", () => this.toggle(idx));
    });
  }

  toggle(idx) {
    this.triggers.forEach((trigger, i) => {
      const content = this.contents[i];
      if (i === idx && !trigger.classList.contains("active")) {
        trigger.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
        content.setAttribute("aria-hidden", "false");
      } else {
        trigger.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0px";
        content.setAttribute("aria-hidden", "true");
      }
    });
  }
}

// Mobile menu toggle with single overlay
document.addEventListener("DOMContentLoaded", () => {
  // Accordion initialization
  document
    .querySelectorAll("[data-accordion]")
    .forEach((acc) => new Accordion(acc));

  const menuBtn = document.querySelector(".mobile-menu-btn");
  const offcanvas = document.querySelector(".offcanvas-menu");
  const overlay = document.querySelector(".offcanvas-overlay");

  const closeMenu = () => {
    offcanvas?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    overlay?.classList.remove("open");
  };

  if (menuBtn && offcanvas && overlay) {
    menuBtn.addEventListener("click", () => {
      const isOpen = offcanvas.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      overlay.classList.toggle("open", isOpen);
    });
    overlay.addEventListener("click", closeMenu);
  }

  // FAQ Nav Scroll & Active Link
  const navLinks = document.querySelectorAll(".faq-nav a");
  const sections = Array.from(
    document.querySelectorAll(".faq-type [data-type]")
  ).map((el) => el.parentElement);

  // Scroll to section on click
  navLinks.forEach((link, idx) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = sections[idx];
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 110; // Offset for sticky header
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // Highlight active link on scroll
  const onScroll = () => {
    const scrollPos = window.scrollY + 130; // Offset for sticky header
    let activeIdx = 0;
    sections.forEach((section, idx) => {
      if (section.offsetTop <= scrollPos) {
        activeIdx = idx;
      }
    });
    navLinks.forEach((link, idx) => {
      link.classList.toggle("active", idx === activeIdx);
    });
  };

  if (navLinks.length && sections.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Coin select modal logic
  const coinModal = document.getElementById("coinModal");
  const coinList = coinModal?.querySelector(".coin-list");
  const coinModalClose = coinModal?.querySelector(".coin-modal-close");
  let currentSelectTrigger = null;

  // Open modal on select-trigger click
  document.querySelectorAll(".select-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      currentSelectTrigger = trigger;
      coinModal.classList.add("open");
    });
  });

  // Select coin from modal
  coinList?.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-coin]");
    if (li && currentSelectTrigger) {
      const coin = JSON.parse(li.getAttribute("data-coin"));
      // Update trigger UI
      const img = currentSelectTrigger.querySelector("img");
      const value = currentSelectTrigger.querySelector(".value");
      if (img) img.src = coin.logo;
      if (img) img.alt = coin.name;
      if (value) value.textContent = coin.short;
      coinModal.classList.remove("open");
      currentSelectTrigger = null;
    }
  });

  // Allow only numbers and decimals in swap input
  document.querySelectorAll(".swap-blk .input").forEach((input) => {
    input.addEventListener("input", function () {
      // Remove any character that is not a digit or decimal point
      this.value = this.value.replace(/[^0-9.]/g, "");
      // Prevent more than one decimal point
      if ((this.value.match(/\./g) || []).length > 1) {
        this.value = this.value.replace(/\.+$/, "");
      }
    });
  });

  // Close modal on backdrop click or outside
  coinModal
    ?.querySelector(".coin-modal-backdrop")
    .addEventListener("click", () => {
      coinModal.classList.remove("open");
      currentSelectTrigger = null;
    });
  coinModalClose?.addEventListener("click", () => {
    coinModal.classList.remove("open");
    currentSelectTrigger = null;
  });

  // Optional: Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && coinModal?.style.display === "flex") {
      coinModal.classList.remove("open");
      currentSelectTrigger = null;
    }
  });
});
