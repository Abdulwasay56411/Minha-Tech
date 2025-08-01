const menuIcon = document.querySelector('.menu-icon');
const btnContainer = document.querySelector('.btn');

menuIcon.addEventListener('click', () => {
  btnContainer.classList.toggle('show');
});

window.addEventListener('pageshow', () => {
  btnContainer.classList.remove('show');
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number h1");
  const speed = 200;

  function runCounter(counter) {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / speed;

      
      const needsPlus = counter.getAttribute("data-plus") === "true";

      function updateCounter() {
          count += increment;
          if (count < target) {
              const value = Math.ceil(count);
              counter.innerText = needsPlus ? `${value}+` : value;
              requestAnimationFrame(updateCounter);
          } else {
              counter.innerText = needsPlus ? `${target}+` : target;
          }
      }

      updateCounter();
  }

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target.querySelector("h1");
              if (!counter.dataset.animated) {
                  runCounter(counter);
                  counter.dataset.animated = "true";
              }
          }
      });
  }, {
      threshold: 0.5
  });

  counters.forEach(counter => {
      counter.setAttribute("data-target", counter.innerText);
      counter.innerText = "0";
      observer.observe(counter.parentElement);
  });
});


// const icons = document.querySelector('.icons');
// const images = Array.from(icons.querySelectorAll('img'));

// let positions = [];
// const gap = 40;
// const speed = 1;

// function initPositions() {
//   let x = 0;
//   images.forEach((img, i) => {
//     positions[i] = x;
//     img.style.position = 'absolute';
//     img.style.left = x + 'px';
//     x += img.offsetWidth + gap;
//   });
// }

// function scrollImages() {
//   for (let i = 0; i < images.length; i++) {
//     positions[i] -= speed;

//     if (positions[i] + images[i].offsetWidth < 0) {
//       let maxRight = Math.max(...positions.map((pos, idx) => pos + images[idx].offsetWidth));
//       positions[i] = maxRight + gap;
//     }

//     images[i].style.left = positions[i] + 'px';
//   }
//   requestAnimationFrame(scrollImages);
// }


// let loadedCount = 0;
// images.forEach((img) => {
//   if (img.complete) {
//     loadedCount++;
//     if (loadedCount === images.length) {
//       initPositions();
//       scrollImages();
//     }
//   } else {
//     img.onload = () => {
//       loadedCount++;
//       if (loadedCount === images.length) {
//         initPositions();
//         scrollImages();
//       }
//     };
//   }
// });

document.addEventListener("DOMContentLoaded", () => {

  const textEls = Array.from(document.querySelectorAll("h1, h2, p, a"));

  const imgEls  = Array.from(document.querySelectorAll("img:not(.icons img)"));

  
  const elements = [...textEls, ...imgEls];


  elements.forEach(el => el.classList.add("animate-on-scroll"));

 
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => {
    observer.observe(el);
  });


  requestAnimationFrame(() => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
        observer.unobserve(el);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,       
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    centeredSlides: false,  
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 1,   
        slidesPerGroup: 1
      }
    }
  });

  const prev = document.querySelector('.custom-prev');
  const next = document.querySelector('.custom-next');

  prev.style.visibility = 'visible';
  next.style.visibility = 'visible';

  prev.addEventListener('click', () => {
    swiper.slidePrev();
  });

  next.addEventListener('click', () => {
    swiper.slideNext();
  });
});