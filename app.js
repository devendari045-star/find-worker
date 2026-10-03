const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================================
   ALL FINDWORKER SERVICES
========================================= */

const ALL_SERVICES = [

  "AC Installation",
  "AC Repair",
  "AC Gas Filling",
  "AC Service",

  "Appliance Repair",
  "Auto Mechanic",

  "Beautician",
  "Bike Mechanic",

  "Car Mechanic",
  "Car Cleaning",
  "Carpenter",
  "CCTV Installation",
  "Cleaner",
  "Computer Repair",

  "Cook",

  "Driver",

  "Electrician",
  "Electrician Helper",

  "Event Decoration",

  "Furniture Repair",

  "Gardener",
  "Geyser Repair",

  "Home Tutor",

  "Inverter Repair",

  "Laptop Repair",

  "Mason",
  "Mechanic",
  "Microwave Repair",
  "Mobile Repair",

  "Painter",
  "Pest Control",
  "Photographer",
  "Plumber",

  "Refrigerator Repair",
  "RO Repair",
  "RO Installation",

  "Salon at Home",
  "Security Guard",
  "Sofa Cleaning",
  "Solar Technician",

  "Tailor",
  "Tile Worker",
  "TV Repair",

  "Washing Machine Repair",
  "Water Purifier Repair",
  "Welder",

  "AC Technician",
  "Computer Technician",
  "Mobile Technician",

  "Packers & Movers",
  "Home Cleaning",
  "Bathroom Cleaning",
  "Kitchen Cleaning",

  "Car Wash",
  "Bike Wash",

  "Printer Repair",
  "Printer Technician",

  "Chimney Repair",
  "RO Technician",

  "False Ceiling Worker",
  "POP Worker",

  "Glass Worker",
  "Aluminium Worker",

  "Fabrication Worker",
  "Welder Fabricator",

  "Construction Worker",
  "Labour",

  "Gardening Service",
  "Interior Designer",

  "Makeup Artist",
  "Mehndi Artist",

  "Laundry Service",
  "Ironing Service",

  "Water Tank Cleaning",
  "Deep Cleaning",

  "CCTV Repair",
  "Internet Technician",

  "WiFi Technician",
  "DTH Technician",

  "Piano Teacher",
  "Music Teacher",

  "Dance Teacher",
  "Yoga Trainer",

  "Fitness Trainer",

  "Other Service"

];


/* =========================================
   DOM
========================================= */

const searchInput =
  document.querySelector(".search input");

const suggestionBox =
  document.querySelector(".service-suggestions");

const categories =
  document.querySelectorAll(".category");

const nearbySection =
  document.querySelector(".nearby");


/* =========================================
   SERVICE ICON
========================================= */

function getServiceIcon(service) {

  const name =
    String(service || "").toLowerCase();

  if (name.includes("electric"))
    return "⚡";

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

  if (
    name.includes("computer") ||
    name.includes("laptop")
  )
    return "💻";

  if (
    name.includes("mechanic") ||
    name.includes("bike") ||
    name.includes("car")
  )
    return "🔧";

  if (name.includes("cook"))
    return "👨‍🍳";

  if (name.includes("driver"))
    return "🚗";

  if (name.includes("camera") ||
      name.includes("cctv"))
    return "📹";

  if (name.includes("painter"))
    return "🎨";

  if (name.includes("tailor"))
    return "🧵";

  if (name.includes("gard"))
    return "🌱";

  if (name.includes("teacher"))
    return "📚";

  if (name.includes("repair"))
    return "🛠️";

  return "👤";
}


/* =========================================
   SHOW SERVICE SUGGESTIONS
========================================= */

function showServiceSuggestions(text) {

  const query =
    text.trim().toLowerCase();


  suggestionBox.innerHTML = "";


  if (!query) {

    suggestionBox.classList.remove("show");

    return;
  }


  /*
    IMPORTANT:
    Starts-with matches first.
    Example:
    "a" → AC Installation, AC Repair...
  */

  const startsWith =
    ALL_SERVICES.filter(service =>
      service.toLowerCase().startsWith(query)
    );


  const contains =
    ALL_SERVICES.filter(service =>
      !service.toLowerCase().startsWith(query) &&
      service.toLowerCase().includes(query)
    );


  const matches = [
    ...startsWith,
    ...contains
  ];


  if (matches.length === 0) {

    suggestionBox.innerHTML = `
      <div class="no-service">
        No matching service found
      </div>
    `;

    suggestionBox.classList.add("show");

    return;
  }


  matches.forEach(service => {

    const item =
      document.createElement("div");


    item.className =
      "service-suggestion";


    item.innerHTML = `

      <div class="suggestion-icon">
        ${getServiceIcon(service)}
      </div>

      <div class="suggestion-name">
        ${escapeHTML(service)}
      </div>

    `;


    item.addEventListener("click", function() {

      searchInput.value = service;

      suggestionBox.classList.remove("show");

      filterWorkers(service);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    });


    suggestionBox.appendChild(item);

  });


  suggestionBox.classList.add("show");
}


/* =========================================
   WORKER PHOTO
========================================= */

function getWorkerPhoto(worker) {

  if (
    worker.photo_url &&
    worker.photo_url.trim() !== ""
  ) {

    return `

      <img
        src="${escapeHTML(worker.photo_url)}"
        alt="${escapeHTML(worker.name)}"
        loading="lazy"
        onerror="
          this.style.display='none';
          this.nextElementSibling.style.display='flex';
        "
      >

      <span
        class="worker-fallback-icon"
        style="display:none;"
      >
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


/* =========================================
   LOAD WORKERS
========================================= */

async function loadWorkers(serviceFilter = "") {

  let query =
    supabaseClient
      .from("workers")
      .select("*")
      .eq("verification_status", "approved");


  if (serviceFilter) {

    query =
      query.ilike(
        "service",
        `%${serviceFilter}%`
      );

  }


  const {
    data,
    error
  } = await query;


  if (error) {

    console.error(
      "Worker loading error:",
      error
    );

    return;
  }


  nearbySection
    .querySelectorAll(".worker")
    .forEach(worker => {
      worker.remove();
    });


  if (!data || data.length === 0) {

    const empty =
      document.createElement("div");

    empty.className =
      "no-workers";


    empty.innerHTML = `

      <div class="empty-icon">
        🔎
      </div>

      <h3>
        No workers found
      </h3>

      <p>
        No approved worker is available
        for this service yet.
      </p>

    `;


    nearbySection.appendChild(empty);

    return;
  }


  data.forEach(worker => {

    const workerCard =
      document.createElement("div");


    workerCard.className =
      "worker";


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
      .addEventListener(
        "click",
        function() {

          showWorkerProfile(worker);

        }
      );

  });

}


/* =========================================
   FILTER WORKERS
========================================= */

function filterWorkers(service) {

  loadWorkers(service);

}


/* =========================================
   WORKER PROFILE
========================================= */

function showWorkerProfile(worker) {

  const oldProfile =
    document.querySelector(
      ".worker-profile"
    );


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
          ₹${escapeHTML(
            String(worker.starting_charge)
          )}
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
    .addEventListener(
      "click",
      function() {
        profile.remove();
      }
    );

}


/* =========================================
   SEARCH INPUT
========================================= */

searchInput.addEventListener(
  "input",
  function() {

    const text =
      this.value.trim();


    showServiceSuggestions(text);


    if (!text) {

      loadWorkers();

    }

  }
);


/* =========================================
   CATEGORY CLICK
========================================= */

categories.forEach(function(category) {

  category.addEventListener(
    "click",
    function() {

      const service =
        this
          .querySelector("span")
          .textContent
          .trim();


      searchInput.value =
        service;


      suggestionBox.classList.remove(
        "show"
      );


      filterWorkers(service);


      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================
   CLOSE SUGGESTIONS OUTSIDE SEARCH
========================================= */

document.addEventListener(
  "click",
  function(event) {

    if (
      !event.target.closest(".search") &&
      !event.target.closest(
        ".service-suggestions"
      )
    ) {

      suggestionBox.classList.remove(
        "show"
      );

    }

  }
);


/* =========================================
   SECURITY
========================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================
   START
========================================= */

loadWorkers();
