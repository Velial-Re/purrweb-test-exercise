window.onload = async function () {
  const btnHamburger = document.querySelector(".btn-hamburger");
  const btn = document.querySelectorAll(".btn");
  const mobileMenu = document.querySelector(".menu-mobile");
  const logo = document.querySelector(".logo");
  const body = document.body;
  const header = document.querySelector(".header");
  const btnClose = document.querySelectorAll(".modal__close");
  const input = document.querySelectorAll(".labels__input");
  const modal = document.querySelectorAll(".modal");
  const modalFeedback = document.querySelector(".modal--feedback");
  const modalComplete = document.querySelector(".modal--complete");
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector(".popup__close");
  const telInput = document.getElementById("tel");
  const btnComplete = document.querySelector(".complete-content__btn");
  const form = document.querySelector(".feedback-form");
  const btnAccept = document.querySelector(".btn-accept");
  const btnDecline = document.querySelector(".btn-decline");
  const customer = document.querySelectorAll(".customer");
  const customerHeader = document.querySelector(".header__customer");
  const customerMenu = document.querySelector(".menu__customer");
  const business = document.querySelectorAll(".business");
  const businessHeader = document.getElementById("header-business");
  const businessBtn = document.querySelector(".btn-mobile");
  const mask = "+79";
  let submitted = false;
  let requiredLabel = [];

  function toggleMenu(type) {
    if (type === "customer") {
      customer[0].classList.add("menu__link-active");
      business[0].classList.remove("menu__link-active");
      customerHeader.style.display = "flex";
      customerMenu.style.display = "flex";
      businessHeader.style.display = "none";
      businessBtn.style.display = "none";
    } else {
      business[0].classList.add("menu__link-active");
      customer[0].classList.remove("menu__link-active");
      businessHeader.style.display = "flex";
      businessBtn.style.display = "flex";
      customerHeader.style.display = "none";
      customerMenu.style.display = "none";
    }
  }
  btn.forEach((item) => {
    item.addEventListener("click", () => {
      let parent = item.parentElement;
      const avoidClasses = [
        "modal",
        "complete-content",
        "popup__buttons",
        "menu__customer",
      ];
      if (!avoidClasses.some((item) => parent.classList.contains(item))) {
        modalFeedback.showModal();
        body.style.overflow = "hidden";
      }
    });
  });
  async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  modalComplete.addEventListener("open", () => {
    body.style.overflow = "hidden";
  });
  modal.forEach((item) => {
    item.addEventListener("close", () => {
      if(submitted){
        body.style.overflow = "hidden";
        submitted = false;
      }else{
          body.style.overflow = "auto";
      } 
    });
  });
  customer.forEach((item) => {
    item.addEventListener("click", () => toggleMenu("customer"));
  });

  business.forEach((item) => {
    item.addEventListener("click", () => toggleMenu("business"));
  });

  function togglePopup(visible) {
    popup.style.display = visible ? "block" : "none";
    body.style.overflow =
      visible && window.innerWidth < 768 ? "hidden" : "auto";
  }

  popupClose.addEventListener("click", () => togglePopup(false));
  btnAccept.addEventListener("click", () => togglePopup(false));
  btnDecline.addEventListener("click", () => togglePopup(false));

  togglePopup(true);

  btnHamburger.addEventListener("click", () => {
    const isActive = btnHamburger.classList.toggle("btn-hamburger-active");
    body.style.overflow = isActive ? "hidden" : "auto";
    mobileMenu.classList.toggle("menu-mobile-active");
    header.classList.toggle("header-mobile");
    logo.classList.toggle("logo-mobile");
  });

  function closeModal(modal) {
    modal.close();
    body.style.overflow = "auto";
  }

  btnClose.forEach((item) => {
    item.addEventListener("click", () => closeModal(item.closest(".modal")));
  });

  modal.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal(item);
      }
    });
  });

  btnComplete.addEventListener("click", () => {
    closeModal(btnComplete.closest(".modal"));
  });

  telInput.addEventListener("focus", () => (telInput.value = mask));
  telInput.addEventListener("blur", () => {
    if (telInput.value === mask) telInput.value = "";
  });

  telInput.addEventListener("input", () => {
    if (!telInput.value.startsWith(mask)) {
      telInput.value = mask;
    }
  });
  input.forEach((item) => {
    if (item.hasAttribute("required")) {
      requiredLabel.push(item);
    }
  });

  function validation() {
    return requiredLabel.every((item) => item.value.trim() !== "");
  }

  function toggleSubmitButton() {
    const isValid = validation();
    document.getElementById("feedback-btn").disabled = !isValid;
  }

  function manageError(item) {
    const errorElement = item.parentElement.querySelector(
      ".feedback-form__field-required"
    );
    if (item.value.trim() === "") {
      item.classList.add("error");
      errorElement.style.display = "block";
    } else {
      item.classList.remove("error");
      errorElement.style.display = "none";
    }
    allRequired();
  }
  function allRequired() {
    if (requiredLabel.every((item) => item.classList.contains("error"))) {
      document.getElementById("feedback-required").style.display = "block";
    } else {
      document.getElementById("feedback-required").style.display = "none";
    }
  }

  input.forEach((item) => {
    if (item.hasAttribute("required")) {
      item.addEventListener("blur", () => {
        manageError(item);
        toggleSubmitButton();
      });

      item.addEventListener("input", () => {
        manageError(item);
        toggleSubmitButton();
      });
    }
  });

  form.addEventListener("submit", (event) => {
    closeModal(form.closest(".modal"), true);
    event.preventDefault();
    modalComplete.showModal();
    submitted = true;
  });
};
