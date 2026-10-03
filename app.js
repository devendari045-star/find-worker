const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const searchInput = document.querySelector(".search input");
const categories = document.querySelectorAll(".category");
const nearbySection = document.querySelector(".nearby");


/* =========================
   SERVICE ICON FALLBACK
========================= */

function getServiceIcon(service) {

  const name = String(service || "").toLowerCase();

  if (name.includes("electric")) return "⚡";
  if (name.includes("plumb")) return "🔧";
  if (name.includes("ac") || name.includes("air")) return "❄️";
  if (name.includes("carpent")) return "🪚";
  if (name.includes("paint")) return "🎨";
  if (name.includes("clean")) return "🧹";
  if (name.includes("mechanic")) return "🔩";
  if (name.includes("mobile")) return "📱";
  if (name.includes("computer")) return "💻";
  if (name.includes("repair")) return "🛠️";

  return "👤";
}


/* =========================
   WORKER PHOTO
========================= */

function getWorkerPhoto(worker) {

  if (worker.photo_url && worker.photo_url.trim() !== "") {

    return `
      <img
        src="${escapeHTML(worker.photo_url)}"
        alt="${escapeHTML(worker.name)}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >

      <span class="worker-fallback-icon" style="display:none;">
        ${getServiceIcon(worker.service)}
      </span>
    `;

  }

  return `
    <span class="worker-fallback-icon">
      ${getServiceIcon(worker.service)}
    </span>
  `;
}


/* =========================
   LOAD WORKERS
========================= */

async function loadWorkers() {

  const { data, error } = await supabaseClient
    .from("workers")
    .select("*")
    .eq("verification_status", "approved");

  if (error) {

    console.error("Worker loading error:", error);

    return;
  }


  nearbySection.querySelectorAll(".worker").forEach(worker => {
    worker.remove();
  });


  data.forEach(worker => {

    const workerCard = document.createElement("div");

    workerCard.className = "worker";


    workerCard.innerHTML = `

      <div class="worker-img">

        ${getWorkerPhoto(worker)}

      </div>


      <div class="worker-info">

        <h3>
          ${escapeHTML(worker.service)}
        </h3>

        <p>
          ${escapeHTML(worker.name)}
          •
          ${escapeHTML(worker.area)}
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


    workerCard
      .querySelector(".view")
      .addEventListener("click", function() {

        showWorkerProfile(worker);

      });

  });

}


/* =========================
   WORKER PROFILE
========================= */

function showWorkerProfile(worker) {

  const oldProfile =
    document.querySelector(".worker-profile");


  if (oldProfile) {
    oldProfile.remove();
  }


  const profile =
    document.createElement("div");


  profile.className =
    "worker-profile";


  profile.innerHTML = `

    <div class="profile-box">


      <button class="close-profile">
        ✕
      </button>


      <div class="profile-icon">

        ${getWorkerPhoto(worker)}

      </div>


      <h2>
        ${escapeHTML(worker.name)}
      </h2>


      <div class="verified">
        ✓ Verified Provider
      </div>


      <div class="profile-details">


        <p>
          🔧
          <strong>Service:</strong>
          ${escapeHTML(worker.service)}
        </p>


        <p>
          📍
          <strong>Area:</strong>
          ${escapeHTML(worker.area)}
        </p>


        <p>
          🛠️
          <strong>Experience:</strong>
          ${escapeHTML(worker.experience)}
        </p>


        <p>
          💰
          <strong>Starting charge:</strong>
          ₹${escapeHTML(String(worker.starting_charge))}
        </p>


        <p>
          🕐
          <strong>Availability:</strong>
          ${escapeHTML(worker.availability)}
        </p>


        <p>
          📝
          <strong>About:</strong>
          ${escapeHTML(worker.description)}
        </p>


      </div>


      <div class="contact-buttons">


        <a
          class="call-button"
          href="tel:${escapeHTML(worker.mobile)}"
        >
          📞 Call
        </a>


        <a
          class="whatsapp-button"
          href="https://wa.me/91${escapeHTML(worker.mobile)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp
        </a>


      </div>


    </div>

  `;


  document.body.appendChild(profile);


  profile
    .querySelector(".close-profile")
    .addEventListener("click", function() {

      profile.remove();

    });

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", function() {

  const searchText =
    this.value.toLowerCase().trim();


  categories.forEach(function(category) {

    const serviceName =
      category
        .querySelector("span")
        .textContent
        .toLowerCase();


    category.style.display =
      serviceName.includes(searchText) ||
      searchText === ""
        ? "flex"
        : "none";

  });


  document
    .querySelectorAll(".worker")
    .forEach(function(worker) {

      const workerText =
        worker.textContent.toLowerCase();


      worker.style.display =
        workerText.includes(searchText) ||
        searchText === ""
          ? "flex"
          : "none";

    });

});


/* =========================
   CATEGORY CLICK
========================= */

categories.forEach(function(category) {

  category.addEventListener("click", function() {

    const service =
      this
        .querySelector("span")
        .textContent;


    searchInput.value = service;


    searchInput.dispatchEvent(
      new Event("input")
    );


    window.scrollTo({

      top: document.body.scrollHeight,

      behavior: "smooth"

    });

  });

});


/* =========================
   SECURITY
========================= */

function escapeHTML(value) {

  return String(value ?? "")

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


/* =========================
   START
========================= */

loadWorkers();
