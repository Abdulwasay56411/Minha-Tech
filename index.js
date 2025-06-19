const menuIcon = document.querySelector('.menu-icon');
const btnContainer = document.querySelector('.btn');

menuIcon.addEventListener('click', () => {
  btnContainer.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number h1");
    const speed = 200;

    function runCounter(counter) {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / speed;

        function updateCounter() {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
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


const icons = document.querySelector('.icons');
const images = Array.from(icons.querySelectorAll('img'));

let positions = [];
const gap = 40;
const speed = 1;

function initPositions() {
  let x = 0;
  images.forEach((img, i) => {
    positions[i] = x;
    img.style.position = 'absolute';
    img.style.left = x + 'px';
    x += img.offsetWidth + gap;
  });
}

function scrollImages() {
  for (let i = 0; i < images.length; i++) {
    positions[i] -= speed;

    if (positions[i] + images[i].offsetWidth < 0) {
      let maxRight = Math.max(...positions.map((pos, idx) => pos + images[idx].offsetWidth));
      positions[i] = maxRight + gap;
    }

    images[i].style.left = positions[i] + 'px';
  }
  requestAnimationFrame(scrollImages);
}


let loadedCount = 0;
images.forEach((img) => {
  if (img.complete) {
    loadedCount++;
    if (loadedCount === images.length) {
      initPositions();
      scrollImages();
    }
  } else {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        initPositions();
        scrollImages();
      }
    };
  }
});

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
    slidesPerView: 1,        // ✨ har view pe sirf 1 card
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    centeredSlides: false,   // ✨ start se align ho slides
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
        slidesPerView: 1,    // ✨ desktop pe bhi 1 card (agar 2 chahiye to 2 likh dena)
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





 





