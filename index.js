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
const gap = 40;  // gap between images in pixels
const speed = 1; // speed of scrolling

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

    // If image completely off the left side, move it to the right after the last image
    if (positions[i] + images[i].offsetWidth < 0) {
      // Find max right edge among images
      let maxRight = Math.max(...positions.map((pos, idx) => pos + images[idx].offsetWidth));
      positions[i] = maxRight + gap;
    }

    images[i].style.left = positions[i] + 'px';
  }
  requestAnimationFrame(scrollImages);
}

// Initialize and start scrolling
initPositions();
scrollImages();
