window.onload = function () {
    const buttonNext = document.querySelector(".slider__button-next");
    const buttonPrev = document.querySelector(".slider__button-prev");
    const slides = document.querySelectorAll(".slider__slides-item");
    var currentSlide = 0;
    var length = slides.length;
    var paginationWorking = false;
    let container = document.querySelector(".slider__slides");
    let containerStyles = getComputedStyle(container);
    let containerWidth = parseInt(containerStyles.width);
    let speed = 5;
    let paginationSpeed = 10;
    async function sleep(seconds) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
    
    const paginate = () => {
        let pagination = document.querySelector(".slider__pagination");
        const renderDots = () => {
          const ul = document.querySelector(".slider__pagination-list");
          for (let i = 0; i < length; i++) {
            const li = renderBtn(i);
            ul.append(li);
          }
        };
    
    buttonNext.addEventListener("click", () => nextSlide(containerWidth));
    async function nextSlide(width, speed = 5, isPagination = false) {
      disableButtons();
      let nextSlideNumber = currentSlide + 1;
      if (nextSlideNumber === length) {
        nextSlideNumber = 0;
      }
      let currentSlidePos = width;
      let previousSlidePos = 0;
      let animationNext = setInterval(frame, 1);
      slides[nextSlideNumber].style.zIndex = 0;
      slides[nextSlideNumber].classList.remove("slider__slides-item-noActive");
      if (!isPagination) {
        activeDot(nextSlideNumber);
      }
      function frame() {
        if (currentSlidePos == 0) {
          clearInterval(animationNext);
          slides[currentSlide].classList.add("slider__slides-item-noActive");
          slides[currentSlide].style = "";
          slides[nextSlideNumber].style = "";
          currentSlide++, nextSlideNumber++;
    
          if (currentSlide === length) {
            currentSlide = 0;
          }
        } else {
          currentSlidePos -= speed;
          previousSlidePos -= speed;
          slides[nextSlideNumber].style.left = currentSlidePos + "px";
          slides[currentSlide].style.left = previousSlidePos + "px";
        }
      }
      await sleep((containerWidth / speed / 100) * 0.5);
      if (!isPagination) {
        enableButtons();
      }
    }
    
    
    
      const renderBtn = (slide) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        li.classList.add("slider__pagination-item");
        btn.classList.add("slider__pagination-item-btn");
        btn.textContent = slide + 1;
        btn.setAttribute("index", slide);
        li.append(btn);
        if (currentSlide === slide) {
          btn.classList.add("slider__pagination-item-btn-active");
        }
        return li;
      };
    
      async function nextPagination(dot) {
        disableDots();
        for (let i = 0; i < dot; i++) {
          if (i === dot) {
            return;
          } else {
            nextSlide(containerWidth, 10, true);
            await sleep((containerWidth / paginationSpeed / 100) * 0.5);
          }
        }
        enableDots();
        enableButtons();
      }
      async function prevPagination(dot) {
        disableDots();
        for (let i = currentSlide; i > dot; i--) {
          if (i === dot) {
            return;
          } else {
            disableButtons();
            prevSlide(containerWidth, 10, true);
            await sleep((containerWidth / paginationSpeed / 100) * 0.5);
          }
        }
        enableDots();
        enableButtons();
      }
      function updatePagination() {
        let dots = document.querySelectorAll(".slider__pagination-item-btn");
        dots.forEach((dot) => {
          dot.addEventListener("click", (event) => {
            if (currentSlide < dot.getAttribute("index")) {
              nextPagination(dot.getAttribute("index") - currentSlide);
            } else {
              prevPagination(dot.getAttribute("index"));
            }
            newActiveDot();
          });
        });
      }
      renderDots();
      updatePagination();
    };
    
    function disableButtons() {
      buttonNext.disabled = true;
      buttonPrev.disabled = true;
    }
    function enableButtons() {
      buttonNext.disabled = false;
      buttonPrev.disabled = false;
    }
    
    function enableDots() {
      let dots = document.querySelectorAll(".slider__pagination-item-btn");
      dots.forEach((dot) => {
        dot.disabled = false;
      });
    }
    
    function disableDots() {
      let dots = document.querySelectorAll(".slider__pagination-item-btn");
      dots.forEach((dot) => {
        dot.disabled = true;
      });
    }
    
    function newActiveDot() {
      let currentActiveDot = document.querySelector(
        ".slider__pagination-item-btn-active"
      );
      currentActiveDot.classList.remove("slider__pagination-item-btn-active");
      event.target.classList.add("slider__pagination-item-btn-active");
    }
    
    function activeDot(nextActiveDot) {
      let dots = document.querySelectorAll(".slider__pagination-item-btn");
    
      dots[currentSlide].classList.remove("slider__pagination-item-btn-active");
      dots[nextActiveDot].classList.add("slider__pagination-item-btn-active");
    }
    buttonPrev.addEventListener("click", () => prevSlide(containerWidth));
    async function prevSlide(width, speed = 5, isPagination = false) {
      disableButtons();
      var prevSlideNumber = currentSlide - 1;
      if (prevSlideNumber < 0) {
        prevSlideNumber = length - 1;
      }
      var currentSlidePos = width;
      var previousSlidePos = 0;
      let animationPrev = setInterval(frame, 1);
      slides[prevSlideNumber].style.zIndex = 0;
      slides[prevSlideNumber].classList.remove("slider__slides-item-noActive");
      if (!isPagination) {
        activeDot(prevSlideNumber);
      }
      function frame() {
        if (currentSlidePos == 0) {
          clearInterval(animationPrev);
          slides[currentSlide].classList.add("slider__slides-item-noActive");
          slides[currentSlide].style = "";
          slides[prevSlideNumber].style = "";
          currentSlide--, prevSlideNumber--;
          if (currentSlide < 0) {
            currentSlide = length - 1;
          }
        } else {
          currentSlidePos -= speed;
          previousSlidePos -= speed;
          slides[prevSlideNumber].style.right = currentSlidePos + "px";
          slides[currentSlide].style.right = previousSlidePos + "px";
        }
      }
      await sleep((containerWidth / speed / 100) * 0.5);
      if (!isPagination) {
        enableButtons();
      }
    }
    paginate();  
}
