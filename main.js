// gsap.registerPlugin(ScrollTrigger);

// const imageFormPoint = document.querySelector(".imageforForm");
// const imageForm = document.querySelector(".image-form");
// const cardFormPoint = document.querySelector(".cardforForm");
// const cardForm = document.querySelector(".card-form");

// const animateOnScroll = (elementAnimate, animateIn, animateOut, marginView) => {
//   return new IntersectionObserver(
//     (entries, observer) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           elementAnimate.style.transform = `${animateIn}`;
//         } else {
//           elementAnimate.style.transform = `${animateOut}`;
//         }
//       });
//     },
//     {
//       root: document,
//       rootMarginTop: `${marginView}`,
//     }
//   );
// };

// const observer3 = animateOnScroll(imageForm, "translateY(0%)", "translateY(100%)", "-200px");
// const observer4 = animateOnScroll(cardForm, "translateX(0%)", "translateX(100%)", "-200px");

// if (window.matchMedia("(min-width: 700px)").matches) {
//   observer3.observe(imageFormPoint);
//   observer4.observe(cardFormPoint);
// } else {
//   cardForm.style.transform = "translateX(0%)";
// }

if (window.matchMedia("(min-width: 992px)").matches) {
  const tl = gsap.timeline();
  tl.fromTo(".choose .header-choose", { x: 500 }, { x: 0, duration: 2 })
    .fromTo(".choose .slider", { opacity: 0 }, { opacity: 1, duration: 2 })
    .fromTo(".choose .board-slider", { opacity: 0 }, { opacity: 1, duration: 2 })
    .fromTo(".choose .button", { opacity: 0 }, { opacity: 1, duration: 2 });

  ScrollTrigger.create({
    animation: tl,
    trigger: ".choose",
    start: "top center",
    end: "top center",
    scrub: 2,
    // markers: true
  });

  const tlBlog = gsap.timeline();
  tlBlog
    .fromTo(".blog .judul h1", { opacity: 0 }, { opacity: 1, duration: 5 })
    .fromTo(".blog .judul p", { opacity: 0 }, { opacity: 1, duration: 5 })
    .fromTo(".blog .slider-blog", { opacity: 0 }, { opacity: 1, duration: 5 })
    .fromTo(".blog .button", { opacity: 0 }, { opacity: 1, duration: 5 });

  ScrollTrigger.create({
    animation: tlBlog,
    trigger: ".blog",
    start: "top center",
    end: "top center",
    scrub: 2,
    // markers: true
  });
}

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
  let widthEl = Math.floor(rectangle.width / 2);
  if (e.target.classList.contains("indicator-button")) {
    let nilai = e.target.getAttribute("indeks");
    indicatorActive(+nilai, sliderIndicator);

    if (window.matchMedia("(min-width: 576px)").matches) {
      i = +nilai * (width + 45);
      sliderItems.forEach((el) => {
        el.style.transform = `translateX(-${i}px)`;
      });
    } else {
      if (+nilai === 0) {
        sliderCard.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else if (+nilai === 1) {
        sliderCard.scrollTo({ top: 0, left: widthEl * 2 + 30, behavior: "smooth" });
      } else {
        sliderCard.scrollTo({ top: 0, left: widthEl * 4 + 60, behavior: "smooth" });
      }
    }
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
    cardTeks.push(el.textContent.substring(0, 200));
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
var style = sliderCardItems[0].currentStyle || window.getComputedStyle(sliderCardItems[0]);
let y = 0;
let x = 0;

var isScrolling;

// Listen for scroll events
sliderCard.addEventListener(
  "scroll",
  function (event) {
    x = sliderCard.scrollLeft;
    let widthEl = Math.floor(rectangle.width / 2);
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(function () {
      y = x;
      if (x == y) {
        if (x < widthEl + 30 && x > 30) {
          sliderCard.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          indicatorActive(0, sliderIndicator);
        } else if (x >= widthEl + 30 && x < widthEl * 3 + 90) {
          sliderCard.scrollTo({ top: 0, left: widthEl * 2 + 30, behavior: "smooth" });
          indicatorActive(1, sliderIndicator);
        } else if (x >= widthEl * 3 + 60) {
          sliderCard.scrollTo({ top: 0, left: widthEl * 4 + 60, behavior: "smooth" });
          indicatorActive(2, sliderIndicator);
        }
      }
    }, 200);
  },
  false
);
