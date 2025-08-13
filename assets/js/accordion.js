// accordion.js
// Simple reusable accordion logic

// Accordion with data-open and animation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
    const triggers = accordion.querySelectorAll("[data-accordion-trigger]");
    const contents = accordion.querySelectorAll("[data-accordion-content]");

    // Setup initial state
    triggers.forEach(function (trigger, idx) {
      const content = contents[idx];
      const open =
        trigger.hasAttribute("data-open") &&
        trigger.getAttribute("data-open") === "true";
      if (open) {
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.classList.add("active");
      } else {
        content.style.maxHeight = "0px";
        trigger.classList.remove("active");
      }
      // Animation setup
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.4s cubic-bezier(0.4,0,0.2,1)";
    });

    triggers.forEach(function (trigger, idx) {
      trigger.addEventListener("click", function () {
        const content = contents[idx];
        const isOpen = trigger.classList.contains("active");
        // Close all
        triggers.forEach((t, i) => {
          t.classList.remove("active");
          contents[i].style.maxHeight = "0px";
        });
        // Open this if not already open
        if (!isOpen) {
          trigger.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  });
});
