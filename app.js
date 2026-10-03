/* =====================================================
   FINDWORKER
   Premium Frontend + Supabase
===================================================== */


/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
  "https://jprqqylhmwenshynrgtk.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";


const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================
   ELEMENTS
========================= */

const searchInput =
  document.querySelector(".search input");

const categories =
  document.querySelectorAll(".category");

const workerList =
  document.querySelector("#worker-list");


/* =========================
   SERVICE ICONS
========================= */

function getServiceIcon(service) {

  const name =
    String(service || "").toLowerCase();

  if (name.includes("electric"))
    return "🔧";

  if (name.includes("plumb"))
    return "🚰";

  if (name.includes("ac"))
    return "❄️";

  if (name.includes("carpent"))
    return "🪚";

  if (name.includes("paint"))
    return "🎨";

  if (name.includes("clean"))
    return "🧹";

  if (name.includes("mobile"))
    return "📱";

  if (name.includes("computer"))
    return "💻";

  if (name.includes("mechanic"))
    return "🚗";

  return "🛠️";
}


/* =========================
   ESCAPE HTML
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
   LOAD WORKERS
========================= */

async function loadWorkers() {

  workerList.innerHTML = `
    <div class="loading-card">

      <div class="loading-spinner"></div>

      <div>
        <strong>Finding workers...</strong>
        <small>Loading verified professionals</small>
      </div>

    </div>
  `;


  const {
    data,
    error
  } = await supabaseClient
    .from("workers")
    .select("*")
    .eq("verification_status", "approved");


  if (error) {

    console.error(
      "Worker loading error:",
      error
    );

    workerList.innerHTML = `
      <div class="empty-card">
        Unable to load workers right now.
      </div>
    `;

    return;
  }


  if (!data || data.length === 0) {

    workerList.innerHTML = `
      <div class="empty-card">
        No verified workers found yet.
      </div>
    `;

    return;
  }


  workerList.innerHTML = "";


  data.forEach((worker, index) => {

    const workerCard =
      document.createElement("div");


    workerCard.className = "worker";


    workerCard.style.animationDelay =
      `${index * 0.08}s`;


    const serviceIcon =
      getServiceIcon(worker.service);


    workerCard.innerHTML = `

      <div class="worker-img">
        ${serviceIcon}
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
          ✓ Verified Provider
        </div>

      </div>


      <button
        class="view"
        type="button"
      >
        View
      </button>

    `;


    workerList.appendChild(workerCard);


    const viewButton =
      workerCard.querySelector(".view");


    viewButton.addEventListener(
      "click",
      () => showWorkerProfile(worker)
    );

  });

}


/* =========================
   WORKER PROFILE
========================= */

function showWorkerProfile(worker) {

  const existing =
    document.querySelector(".worker-profile");


  if (existing) {
    existing.remove();
  }


  const serviceIcon =
    getServiceIcon(worker.service);


  const profile =
    document.createElement("div");


  profile.className =
    "worker-profile";


  profile.innerHTML = `

    <div class="profile-box">


      <!-- HERO -->

      <div class="profile-hero">

        <button
          class="close-profile"
          type="button"
          aria-label="Close"
        >
          ×
        </button>


        <div class="profile-avatar">
          ${serviceIcon}
        </div>


        <h2>
          ${escapeHTML(worker.name)}
        </h2>


        <div class="profile-service">
          ${escapeHTML(worker.service)}
        </div>


        <div class="verified">
          ✓ Verified Provider
        </div>

      </div>


      <!-- STATS -->

      <div class="profile-stats">


        <div class="stat-box">

          <div class="stat-value">
            ${escapeHTML(worker.experience || "—")}
          </div>

          <div class="stat-label">
            Experience
          </div>

        </div>


        <div class="stat-box">

          <div class="stat-value">
            ₹${escapeHTML(
              String(worker.starting_charge ?? "—")
            )}
          </div>

          <div class="stat-label">
            Starting
          </div>

        </div>


        <div class="stat-box">

          <div class="stat-value">
            ${escapeHTML(
              worker.availability || "—"
            )}
          </div>

          <div class="stat-label">
            Status
          </div>

        </div>


      </div>


      <!-- DETAILS -->

      <div class="profile-details">


        <div class="profile-detail">

          <div class="detail-icon">
            📍
          </div>

          <div class="detail-content">

            <span class="detail-label">
              Service Area
            </span>

            <span class="detail-value">
              ${escapeHTML(worker.area)}
            </span>

          </div>

        </div>


        <div class="profile-detail">

          <div class="detail-icon">
            🛠️
          </div>

          <div class="detail-content">

            <span class="detail-label">
              Service
            </span>

            <span class="detail-value">
              ${escapeHTML(worker.service)}
            </span>

          </div>

        </div>


        <div class="profile-detail">

          <div class="detail-icon">
            🕐
          </div>

          <div class="detail-content">

            <span class="detail-label">
              Availability
            </span>

            <span class="detail-value">
              ${escapeHTML(worker.availability)}
            </span>

          </div>

        </div>


      </div>


      <!-- ABOUT -->

      <div class="about-box">

        <div class="about-title">
          About Professional
        </div>

        <div class="about-text">
          ${escapeHTML(
            worker.description ||
            "Professional service provider."
          )}
        </div>

      </div>


      <!-- CONTACT -->

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


  /* CLOSE BUTTON */

  profile
    .querySelector(".close-profile")
    .addEventListener(
      "click",
      () => closeProfile(profile)
    );


  /* CLICK OUTSIDE */

  profile.addEventListener(
    "click",
    (event) => {

      if (event.target === profile) {
        closeProfile(profile);
      }

    }
  );


  /* ESC KEY */

  document.addEventListener(
    "keydown",
    function escapeHandler(event) {

      if (event.key === "Escape") {

        closeProfile(profile);

        document.removeEventListener(
          "keydown",
          escapeHandler
        );

      }

    }
  );


  /* LOCK PAGE SCROLL */

  document.body.style.overflow = "hidden";
}


/* =========================
   CLOSE PROFILE
========================= */

function closeProfile(profile) {

  if (!profile) return;


  profile.style.opacity = "0";


  setTimeout(() => {

    profile.remove();

    document.body.style.overflow = "";

  }, 180);

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  "input",
  function () {

    const searchText =
      this.value
        .toLowerCase()
        .trim();


    /* CATEGORY FILTER */

    categories.forEach(category => {

      const service =
        category
          .querySelector("span")
          .textContent
          .toLowerCase();


      category.style.display =
        service.includes(searchText) ||
        searchText === ""
          ? "flex"
          : "none";

    });


    /* WORKER FILTER */

    const workers =
      document.querySelectorAll(".worker");


    workers.forEach(worker => {

      const workerText =
        worker.textContent.toLowerCase();


      worker.style.display =
        workerText.includes(searchText) ||
        searchText === ""
          ? "flex"
          : "none";

    });

  }
);


/* =========================
   CATEGORY CLICK
========================= */

categories.forEach(category => {

  category.addEventListener(
    "click",
    function () {

      const service =
        this.dataset.service ||
        this.querySelector("span")
          .textContent;


      searchInput.value =
        service;


      searchInput.dispatchEvent(
        new Event("input")
      );


      document
        .querySelector(".nearby")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }
  );

});


/* =========================
   NAVIGATION UI
========================= */

document
  .querySelectorAll(".nav-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      function () {

        document
          .querySelectorAll(".nav-item")
          .forEach(nav => {
            nav.classList.remove("active");
          });


        this.classList.add("active");

      }
    );

  });


/* =========================
   START APP
========================= */

console.log(
  "FindWorker connected to Supabase"
);


loadWorkers();
