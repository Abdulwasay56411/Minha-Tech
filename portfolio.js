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
 
const allCards = document.querySelectorAll('.cards-section > div');
const leftBtn = document.querySelector('.circle-color');
const rightBtn = document.querySelector('.circle');

const gradient = 'linear-gradient(to right, #06B8FF, #00FB94)';
const white = '#ffffff';

let currentSet = 0;

function updateCards() {
  allCards.forEach((card, index) =>{
    if (currentSet === 0 && index <4){
      card.style.display = 'block';
      card.style.opacity = 0;
      card.style.transition = 'opacity 0.4s ease';
      setTimeout(() =>{
        card.style.opacity = 1;
      }, 50);
    } else if (currentSet === 1 && index >= 4 && index < 8){
      card.style.display = 'block';
      card.style.opacity = 0;
      card.style.transition = 'opacity 0.4s ease';
      setTimeout(() =>{
        card.style.opacity = 1;
      }, 50); 
    } else{
      card.style.display = 'none';
    }
  });
}

function setActiveButton(activeBtn, inactiveBtn){
  activeBtn.style.backgroundImage = gradient;
  activeBtn.style.backgroundColor = '';
  inactiveBtn.style.backgroundImage = 'none';
  inactiveBtn.style.backgroundColor = white;
}

leftBtn.addEventListener('click', () =>{
  currentSet = 1;
  updateCards ();
  setActiveButton(leftBtn, rightBtn);
});

rightBtn.addEventListener('click',() =>{
  currentSet = 0;
  updateCards();
  setActiveButton(rightBtn, leftBtn);
});

updateCards();
setActiveButton(rightBtn, leftBtn);

