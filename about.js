document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("h1, h2, p, img, a");

    elements.forEach(el => el.classList.add("animate-on-scroll"));

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    // ✅ Start observing + immediately check if already in viewport
    elements.forEach(el => {
      observer.observe(el);

      // ✅ Check if element already visible on load
      const rect = el.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        el.classList.add("visible");
        observer.unobserve(el);
      }
    });
  });

