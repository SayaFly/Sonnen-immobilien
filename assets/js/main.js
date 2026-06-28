document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({ duration: 900, once: true });
  }

  const navbar = document.querySelector(".glass-nav");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = String(target);
      } else {
        counter.textContent = String(current);
        requestAnimationFrame(tick);
      }
    };
    tick();
  });

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1.1, ease: "power3.out" });
    gsap.utils.toArray(".property-card").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("formMessage");
      if (!message) return;
      message.classList.remove("d-none", "text-danger");
      message.classList.add("text-success");
      message.textContent = "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.";
      form.reset();
    });
  }
});
