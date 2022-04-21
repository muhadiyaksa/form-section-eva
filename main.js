const imageFormPoint = document.querySelector(".imageforForm");
const imageForm = document.querySelector(".image-form");
const cardFormPoint = document.querySelector(".cardforForm");
const cardForm = document.querySelector(".card-form");

const animateOnScroll = (elementAnimate, animateIn, animateOut, marginView) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log("masuk nih");
          elementAnimate.style.transform = `${animateIn}`;
        } else {
          // console.log("yah keluar");
          elementAnimate.style.transform = `${animateOut}`;
        }
      });
    },
    {
      root: document,
      rootMarginTop: `${marginView}`,
    }
  );
};

const observer3 = animateOnScroll(imageForm, "translateY(0%)", "translateY(100%)", "-200px");
const observer4 = animateOnScroll(cardForm, "translateX(0%)", "translateX(100%)", "-200px");

observer3.observe(imageFormPoint);
observer4.observe(cardFormPoint);

//Slider
const sliderItems = document.querySelectorAll(".slider-items");
const card = document.querySelectorAll(".card");

const buttonSliderNext = document.querySelector("button.slider-next");
const buttonSliderPrevious = document.querySelector("button.slider-previous");
const sliderIndicator = document.querySelectorAll(".indicator-slider button");

let width = document.querySelector(".slider-items.active").offsetWidth;

let i = 0;

buttonSliderNext.addEventListener("click", function () {
  if (i + width >= width * 3) {
    i = 0;
  } else {
    i = i + width + 45;
  }
  let nilai = i / (width + 45);
  indicatorActive(nilai, sliderIndicator);

  sliderItems.forEach((el) => {
    el.style.transform = `translateX(-${i}px)`;
  });
});

buttonSliderPrevious.addEventListener("click", function () {
  if (i === 0) {
    i = (width + 45) * 2;
  } else {
    i = i - (width + 45);
  }
  console.log(i);
  let nilai = i / (width + 45);
  indicatorActive(nilai, sliderIndicator);
  sliderItems.forEach((el) => {
    el.style.transform = `translateX(-${i}px)`;
  });
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("indicator-button")) {
    let nilai = e.target.getAttribute("indeks");
    i = +nilai * (width + 45);
    indicatorActive(+nilai, sliderIndicator);
    sliderItems.forEach((el) => {
      el.style.transform = `translateX(-${i}px)`;
    });
  }
});

function indicatorActive(params, element) {
  element.forEach((el) => {
    el.classList.remove("btn-warning");
  });

  element[params].classList.add("btn-warning");
}

//--------------------------------------------------------------------------
// JAVASCRIPT FOR BLOG
function textCutter(element) {
  let cardTeks = [];
  element.forEach((el) => {
    cardTeks.push(el.textContent.substring(0, 180));
  });
  document.querySelectorAll(".card .card-text").forEach((el, i) => {
    el.innerHTML = `${cardTeks[i]}...`;
  });
}
const cardText = document.querySelectorAll(".card .card-text");
textCutter(cardText);
//--------------------------------------------------------------------------

const sliderCard = document.querySelector(".choose .slider .board-slider");
const sliderCardItems = document.querySelectorAll(".choose .slider .board-slider .slider-items");
var rectangle = sliderCardItems[0].getBoundingClientRect();
let x = 0;
var style = sliderCardItems[0].currentStyle || window.getComputedStyle(sliderCardItems[0]);
sliderCard.addEventListener("scroll", function () {
  console.log(style.marginRight);
  console.log(window.scrollX);
});
