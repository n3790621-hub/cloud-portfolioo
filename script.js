/**
 * Navithra Portfolio — script.js
 * Features:
 *   - Responsive hamburger menu
 *   - Navbar scroll behaviour
 *   - Active nav link highlighting (IntersectionObserver)
 *   - Scroll-reveal animations
 *   - Skill bar animations (triggered on first visibility)
 *   - Contact form with mailto fallback and inline validation
 *   - Back-to-top button
 *   - Keyboard accessibility helpers
 */

(function () {
  "use strict";

  /* ── DOM refs ─────────────────────────────────────────────── */
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");
  const allLinks  = navLinks.querySelectorAll("a");
  const backTop   = document.getElementById("back-top");
  const sections  = document.querySelectorAll("section[id]");

  /* ── Hamburger (mobile) ───────────────────────────────────── */
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close menu when a link is clicked
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  /* ── Navbar scroll behaviour ──────────────────────────────── */
  window.addEventListener("scroll", handleScroll, { passive: true });

  function handleScroll() {
    const y = window.scrollY;

    // Frosted glass intensifies on scroll
    navbar.classList.toggle("scrolled", y > 60);

    // Back-to-top visibility
    backTop.classList.toggle("visible", y > 400);
  }

  /* ── Back to top ──────────────────────────────────────────── */
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Active nav link (IntersectionObserver) ───────────────── */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          allLinks.forEach((link) => {
            const match = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", match);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ── Scroll-reveal ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Stagger children if the element itself is not a card
          // (gives progressive feel for grids)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ── Skill bars – animate on scroll-in ──────────────────────
     The fill bars use CSS transition triggered when the parent
     .skill-group gains the .visible class.                      */
  // Already handled by the .visible class toggled above + CSS
  // (the .fill rule: .visible .fill { transform: scaleX(1) })

  /* ── Stagger grid children ────────────────────────────────── */
  // Add slight delays to sibling cards for a cascade effect
  const grids = document.querySelectorAll(
    ".projects-grid, .certs-grid, .skills-grid"
  );
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll(
      ".project-card, .cert-card, .skill-group"
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
    });
  });

  /* ── Contact form ─────────────────────────────────────────── */
  const sendBtn  = document.getElementById("cf-send");
  const nameInp  = document.getElementById("cf-name");
  const emailInp = document.getElementById("cf-email");
  const msgInp   = document.getElementById("cf-msg");
  const status   = document.getElementById("cf-status");

  sendBtn.addEventListener("click", () => {
    const name  = nameInp.value.trim();
    const email = emailInp.value.trim();
    const msg   = msgInp.value.trim();

    // Basic validation
    if (!name || !email || !msg) {
      setStatus("Please fill in all fields.", "err");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.", "err");
      return;
    }

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`
    );
    const mailtoURL = `mailto:navithra2026@gmail.com?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoURL;

    // Feedback
    setStatus("Opening your mail client… 📬", "ok");
    nameInp.value  = "";
    emailInp.value = "";
    msgInp.value   = "";

    setTimeout(() => setStatus("", ""), 5000);
  });

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className   = `form-note ${type}`;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Smooth anchor scroll (override for hash links) ─────────
     Accounts for fixed navbar height so headings aren't hidden. */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.getBoundingClientRect().height;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ── Initial call ─────────────────────────────────────────── */
  handleScroll();
})();