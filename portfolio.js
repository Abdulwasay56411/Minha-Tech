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

const cards = document.querySelectorAll('.cards, .hero, .hero-card, .hero-section');
const leftCircle = document.querySelector('.circle');
const rightCircle = document.querySelector('.circle-color');

let currentPage = 0; 

showCards(0);
updateCircles();

rightCircle.addEventListener('click', () => {
    if (currentPage === 0) {
        currentPage = 1;
        showCards(4);
        updateCircles();
    }
});

leftCircle.addEventListener('click', () => {
    if (currentPage === 1) {
        currentPage = 0;
        showCards(0);
        updateCircles();
    }
});

function showCards(startIndex) {
    cards.forEach((card, index) => {
        if (index >= startIndex && index < startIndex + 4) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateCircles() {
    const gradient = 'linear-gradient(to right, #06B8FF, #00FB94)';
    if (currentPage === 0) {
        leftCircle.style.display = 'none';  
        rightCircle.style.display = 'flex'; 
        rightCircle.style.background = '';
        leftCircle.style.background = gradient; 
    } else {
        leftCircle.style.display = 'flex';  
        leftCircle.style.background = '';
        rightCircle.style.background = gradient;
    }
}

document.addEventListener("DOMContentLoaded", () =>{
  const cards = document.querySelectorAll('.cards, .hero, .hero-card, .hero-section');

  cards.forEach(card => card.classList.add("animate-on-scroll"));

  const observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry =>{
      if(entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold: 0.2
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
});





