import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import $ from "jquery";
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

window.$ = window.jQuery = $;

$(function () {
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

  document.querySelectorAll("#login-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    const linkedPage = new URL(link.href).pathname.split("/").pop();
    const isCurrentPage =
      linkedPage === currentPage ||
      (currentPage === "" && linkedPage === "index.html");

    link.classList.toggle("active", isCurrentPage);

    if (isCurrentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  console.log("Safarni website is ready!");
});
