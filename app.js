const searchInput = document.querySelector(".search input");
const categories = document.querySelectorAll(".category");
const workers = document.querySelectorAll(".worker");
const viewButtons = document.querySelectorAll(".view");

/* SEARCH */

searchInput.addEventListener("input", function () {

  const searchText = this.value.toLowerCase().trim();

  categories.forEach(function (category) {

    const serviceName =
      category.querySelector("span").textContent.toLowerCase();

    if (serviceName.includes(searchText) || searchText === "") {
      category.style.display = "flex";
    } else {
      category.style.display = "none";
    }

  });

  workers.forEach(function (worker) {

    const workerName =
      worker.querySelector("h3").textContent.toLowerCase();

    if (workerName.includes(searchText) || searchText === "") {
      worker.style.display = "flex";
    } else {
      worker.style.display = "none";
    }

  });

});


/* CATEGORY CLICK */

categories.forEach(function (category) {

  category.addEventListener("click", function () {

    const service =
      this.querySelector("span").textContent;

    searchInput.value = service;

    searchInput.dispatchEvent(new Event("input"));

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });

  });

});


/* VIEW BUTTON */

viewButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const worker =
      this.closest(".worker");

    const workerName =
      worker.querySelector("h3").textContent;

    alert(
      "You selected " +
      workerName +
      ".\n\nWorker profile and contact options will be available soon."
    );

  });

});
