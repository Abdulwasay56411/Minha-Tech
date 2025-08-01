const menuIcon = document.querySelector('.menu-icon');
const btnContainer = document.querySelector('.btn');

menuIcon.addEventListener('click', () => {
  btnContainer.classList.toggle('show');
});

window.addEventListener('pageshow', () => {
  btnContainer.classList.remove('show');
});


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("h1, h2, p, img, a, button");

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

   
    elements.forEach(el => {
      observer.observe(el);

   
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

