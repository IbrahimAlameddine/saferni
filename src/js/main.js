import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import Modal from "bootstrap/js/dist/modal";

import "../assets/images/icon.png";
import "../assets/images/icon-white.png";
import "../assets/images/1.jpg";
import "../assets/images/2.jpg";
import "../assets/images/egypt/1.jpg";
import "../assets/images/egypt/2.jpg";
import "../assets/images/egypt/3.jpg";
import "../assets/images/egypt/4.jpg";
import "../assets/images/egypt/5.jpg";
import "../assets/images/egypt/6.jpg";
import "../assets/images/egypt/7.jpg";
import "../assets/images/egypt/8.jpg";
import "../assets/images/turkey/1.jpg";
import "../assets/images/turkey/2.jpg";
import "../assets/images/turkey/3.jpg";
import "../assets/images/turkey/4.jpg";
import "../assets/images/turkey/5.jpg";
import "../assets/images/turkey/6.jpg";
import "../assets/images/turkey/7.jpg";
import "../assets/images/turkey/8.jpg";
import "../scss/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const registerForm = document.querySelector("#register-form");
  if (registerForm) {
    const password = registerForm.querySelector("#register-password");
    const passwordConfirm = registerForm.querySelector(
      "#register-password-confirm"
    );

    const validatePasswordMatch = () => {
      passwordConfirm.setCustomValidity(
        password.value === passwordConfirm.value
          ? ""
          : "كلمتا المرور غير متطابقتين."
      );
    };

    password.addEventListener("input", validatePasswordMatch);
    passwordConfirm.addEventListener("input", validatePasswordMatch);
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    const linkedPage = new URL(link.href).pathname.split("/").pop();
    const isCurrentPage = linkedPage === currentPage;

    link.classList.toggle("active", isCurrentPage);

    if (isCurrentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const galleryImages = document.querySelectorAll(".tour-gallery-image");

  if (galleryImages.length > 0) {
    const modalElement = document.createElement("div");
    modalElement.className = "modal fade tour-image-modal";
    modalElement.tabIndex = -1;
    modalElement.setAttribute("aria-hidden", "true");
    modalElement.setAttribute("aria-label", "معرض صور الرحلة");

    const dialog = document.createElement("div");
    dialog.className = "modal-dialog modal-dialog-centered modal-xl";

    const content = document.createElement("div");
    content.className = "modal-content";

    const body = document.createElement("div");
    body.className = "modal-body";

    const imageFrame = document.createElement("div");
    imageFrame.className = "tour-image-modal-frame";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close tour-image-modal-close";
    closeButton.setAttribute("aria-label", "إغلاق الصورة");
    closeButton.setAttribute("data-bs-dismiss", "modal");

    const modalImage = document.createElement("img");
    modalImage.className = "tour-image-modal-image";
    modalImage.alt = "";

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.className =
      "btn btn-light tour-image-modal-control tour-image-modal-previous";
    previousButton.setAttribute("aria-label", "الصورة السابقة");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className =
      "btn btn-light tour-image-modal-control tour-image-modal-next";
    nextButton.setAttribute("aria-label", "الصورة التالية");

    const isRtl =
      window.getComputedStyle(document.documentElement).direction === "rtl";
    previousButton.textContent = isRtl ? "→" : "←";
    nextButton.textContent = isRtl ? "←" : "→";

    imageFrame.append(modalImage, previousButton, nextButton);
    body.append(imageFrame);
    content.append(body);
    dialog.append(content);
    modalElement.append(dialog, closeButton);
    document.body.append(modalElement);

    const imageModal = new Modal(modalElement, { keyboard: false });
    let activeImageIndex = 0;

    const showImage = (index) => {
      activeImageIndex = index;
      const selectedImage = galleryImages[activeImageIndex];
      modalImage.src = selectedImage.src;
      modalImage.alt = selectedImage.alt;
    };

    const moveImage = (step) => {
      const nextIndex =
        (activeImageIndex + step + galleryImages.length) % galleryImages.length;
      showImage(nextIndex);
    };

    galleryImages.forEach((image, index) => {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `عرض الصورة بحجم كبير: ${image.alt}`);

      const openImage = () => {
        showImage(index);
        imageModal.show();
      };

      image.addEventListener("click", openImage);
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage();
        }
      });
    });

    previousButton.addEventListener("click", () => moveImage(-1));
    nextButton.addEventListener("click", () => moveImage(1));

    const handleModalKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        imageModal.hide();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveImage(isRtl ? -1 : 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveImage(isRtl ? 1 : -1);
      }
    };

    modalElement.addEventListener("shown.bs.modal", () => {
      document.addEventListener("keydown", handleModalKeydown);
    });
    modalElement.addEventListener("hidden.bs.modal", () => {
      document.removeEventListener("keydown", handleModalKeydown);
    });
  }
});
