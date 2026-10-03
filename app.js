const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const searchInput = document.querySelector(".search input");
const categories = document.querySelectorAll(".category");
const nearbySection = document.querySelector(".nearby");

/* LOAD APPROVED WORKERS */

async function loadWorkers() {

  const { data, error } = await supabaseClient
    .from("workers")
    .select("*")
    .eq("verification_status", "approved");

  if (error) {
    console.error("Worker loading error:", error);
    return;
  }

  const oldWorkers = nearbySection.querySelectorAll(".worker");
  oldWorkers.forEach(worker => worker.remove());

  data.forEach(worker => {

    const workerCard = document.createElement("div");

    workerCard.className = "worker";

    workerCard.innerHTML = `
      <div class="worker-img">
        🔧
      </div>

      <div class="worker-info">
        <h3>${worker.service}</h3>

        <p>
          ${worker.name} • ${worker.area}
        </p>

        <div class="rating">
          ⭐ Verified Provider
        </div>
      </div>

      <button class="view">
        View
      </button>
    `;

    nearbySection.appendChild(workerCard);

    const viewButton = workerCard.querySelector(".view");

    viewButton.addEventListener("click", function () {

      alert(
        "Worker: " + worker.name +
        "\nService: " + worker.service +
        "\nArea: " + worker.area +
        "\nExperience: " + worker.experience +
        "\nStarting charge: ₹" + worker.starting_charge +
        "\nMobile: " + worker.mobile
      );

    });

  });

}


/* SEARCH */

searchInput.addEventListener("input", function () {

  const searchText = this.value.toLowerCase().trim();

  categories.forEach(function (category) {

    const serviceName =
      category.querySelector("span").textContent.toLowerCase();

    category.style.display =
      serviceName.includes(searchText) || searchText === ""
        ? "flex"
        : "none";

  });

  const workers = document.querySelectorAll(".worker");

  workers.forEach(function (worker) {

    const workerText =
      worker.textContent.toLowerCase();

    worker.style.display =
      workerText.includes(searchText) || searchText === ""
        ? "flex"
        : "none";

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


/* LOAD DATA */

loadWorkers();
