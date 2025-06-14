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
                    counter.dataset.animated = "true"; // Mark as animated
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Set data-target attribute for each counter
    counters.forEach(counter => {
        counter.setAttribute("data-target", counter.innerText);
        counter.innerText = "0";
        observer.observe(counter.parentElement); // Observe the parent `.number`
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

// ✅ Wait for all images to load before initializing
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

document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  // Start pe prev button chhupa dena
  document.querySelector('.swiper-button-prev').style.display = 'none';

  swiper.on('slideChange', function () {
    if (swiper.activeIndex === 0) {
      // Pehla slide hai: prev button hide
      document.querySelector('.swiper-button-prev').style.display = 'none';
    } else {
      // Aage gaya hai: prev button dikhana
      document.querySelector('.swiper-button-prev').style.display = 'block';
    }
  });
});



