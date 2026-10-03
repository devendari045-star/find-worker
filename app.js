// ============================================================
// FINDWORKER - APP.JS
// Customer-side stable version
// Search emoji fix included
// ============================================================

const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";

// IMPORTANT:
// Apni existing Supabase publishable key yahin rakho.
// Maine security ke liye key yahan repeat nahi ki hai.
const SUPABASE_ANON_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ============================================================
// SERVICES
// ============================================================

const ALL_SERVICES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Repair",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "RO Repair",
  "TV Repair",
  "Mobile Repair",
  "Computer Repair",
  "CCTV Installation",
  "Pest Control",
  "Cleaning",
  "Home Cleaning",
  "Bathroom Cleaning",
  "Kitchen Cleaning",
  "Sofa Cleaning",
  "Car Cleaning",
  "Bike Repair",
  "Car Repair",
  "Mechanic",
  "Mason",
  "Welder",
  "Driver",
  "Cook",
  "Gardener",
  "Tailor",
  "Beauty Parlour",
  "Hairdresser",
  "Makeup Artist",
  "Tutor",
  "Packers & Movers",
  "Security Guard",
  "Other"
];


// ============================================================
// DOM
// ============================================================

const serviceSearch = document.getElementById("service-search");
const serviceSuggestions = document.getElementById("service-suggestions");
const workerList = document.getElementById("worker-list");


// ============================================================
// HELPERS
// ============================================================

function escapeHTML(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getServiceIcon(service) {
  const icons = {
    "Electrician": "⚡",
    "Plumber": "🔧",
    "Carpenter": "🪚",
    "Painter": "🎨",
    "AC Repair": "❄️",
    "Refrigerator Repair": "🧊",
    "Washing Machine Repair": "🧺",
    "RO Repair": "💧",
    "TV Repair": "📺",
    "Mobile Repair": "📱",
    "Computer Repair": "💻",
    "CCTV Installation": "📹",
    "Pest Control": "🐜",
    "Cleaning": "🧹",
    "Home Cleaning": "🏠",
    "Bathroom Cleaning": "🚿",
    "Kitchen Cleaning": "🍳",
    "Sofa Cleaning": "🛋️",
    "Car Cleaning": "🚗",
    "Bike Repair": "🏍️",
    "Car Repair": "🚘",
    "Mechanic": "🔩",
    "Mason": "🧱",
    "Welder": "🛠️",
    "Driver": "🚕",
    "Cook": "👨‍🍳",
    "Gardener": "🌱",
    "Tailor": "🧵",
    "Beauty Parlour": "💄",
    "Hairdresser": "💇",
    "Makeup Artist": "💅",
    "Tutor": "📚",
    "Packers & Movers": "📦",
    "Security Guard": "🛡️"
  };

  return icons[service] || "🛠️";
}


function getWorkerPhoto(worker) {
  const photo =
    worker["photo url"] ??
    worker.photo_url ??
    worker.photo ??
    "";

  if (!photo) {
    return "";
  }

  return String(photo).trim();
}


function getStartingCharge(worker) {
  return (
    worker["starting charge"] ??
    worker.starting_charge ??
    ""
  );
}


// ============================================================
// SEARCH SUGGESTIONS
// IMPORTANT: NO EMOJI HERE
// ============================================================

function showServiceSuggestions(value) {
  if (!serviceSuggestions) return;

  const searchValue = String(value || "").trim().toLowerCase();

  if (!searchValue) {
    serviceSuggestions.innerHTML = "";
    serviceSuggestions.style.display = "none";
    return;
  }

  const matches = ALL_SERVICES.filter(service =>
    service.toLowerCase().includes(searchValue)
  ).slice(0, 8);

  if (!matches.length) {
    serviceSuggestions.innerHTML = "";
    serviceSuggestions.style.display = "none";
    return;
  }

  serviceSuggestions.innerHTML = matches
    .map(service => `
      <div
        class="service-suggestion-item"
        data-service="${escapeHTML(service)}"
      >
        ${escapeHTML(service)}
      </div>
    `)
    .join("");

  serviceSuggestions.style.display = "block";

  serviceSuggestions
    .querySelectorAll(".service-suggestion-item")
    .forEach(item => {
      item.addEventListener("click", () => {
        const service = item.dataset.service;

        if (serviceSearch) {
          serviceSearch.value = service;
        }

        serviceSuggestions.innerHTML = "";
        serviceSuggestions.style.display = "none";

        loadWorkers(service);
      });
    });
}


// ============================================================
// SEARCH EVENTS
// ============================================================

if (serviceSearch) {

  serviceSearch.addEventListener("input", () => {
    showServiceSuggestions(serviceSearch.value);

    const value = serviceSearch.value.trim();

    if (!value) {
      loadWorkers();
    }
  });


  serviceSearch.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();

      const value = serviceSearch.value.trim();

      if (serviceSuggestions) {
        serviceSuggestions.innerHTML = "";
        serviceSuggestions.style.display = "none";
      }

      if (value) {
        loadWorkers(value);
      } else {
        loadWorkers();
      }
    }
  });
}


// Close suggestions when clicking outside

document.addEventListener("click", event => {
  if (!serviceSearch || !serviceSuggestions) return;

  if (
    !serviceSearch.contains(event.target) &&
    !serviceSuggestions.contains(event.target)
  ) {
    serviceSuggestions.innerHTML = "";
    serviceSuggestions.style.display = "none";
  }
});


// ============================================================
// LOAD WORKERS
// ============================================================

async function loadWorkers(serviceFilter = "") {

  if (!workerList) return;

  workerList.innerHTML = `
    <div class="loading-state">
      Loading workers...
    </div>
  `;

  try {

    let query = supabaseClient
      .from("workers")
      .select("*")
      .eq("verification_status", "approved");

    if (serviceFilter && serviceFilter.trim()) {
      query = query.ilike(
        "service",
        `%${serviceFilter.trim()}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Workers load error:", error);

      workerList.innerHTML = `
        <div class="no-workers">
          Unable to load workers right now.
        </div>
      `;

      return;
    }

    if (!data || data.length === 0) {
      workerList.innerHTML = `
        <div class="no-workers">
          No workers found for this service.
        </div>
      `;

      return;
    }

    workerList.innerHTML = data
      .map(worker => createWorkerCard(worker))
      .join("");

    workerList
      .querySelectorAll("[data-worker-id]")
      .forEach(card => {
        card.addEventListener("click", event => {

          if (
            event.target.closest(".worker-action-btn") ||
            event.target.closest("button") ||
            event.target.closest("a")
          ) {
            return;
          }

          const workerId = card.dataset.workerId;

          const worker = data.find(
            item => String(item.id) === String(workerId)
          );

          if (worker) {
            openWorkerProfile(worker);
          }
        });
      });

    setupWorkerButtons(data);

  } catch (error) {

    console.error("Unexpected worker error:", error);

    workerList.innerHTML = `
      <div class="no-workers">
        Something went wrong. Please try again.
      </div>
    `;
  }
}


// ============================================================
// WORKER CARD
// ============================================================

function createWorkerCard(worker) {

  const photo = getWorkerPhoto(worker);
  const charge = getStartingCharge(worker);

  const name = escapeHTML(worker.name || "Worker");
  const service = escapeHTML(worker.service || "Service");
  const area = escapeHTML(worker.area || "Area");
  const experience = escapeHTML(worker.experience || "0");

  const imageHTML = photo
    ? `
      <img
        src="${escapeHTML(photo)}"
        alt="${name}"
        class="worker-photo"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="worker-photo-placeholder" style="display:none;">
        ${getServiceIcon(worker.service)}
      </div>
    `
    : `
      <div class="worker-photo-placeholder">
        ${getServiceIcon(worker.service)}
      </div>
    `;

  return `
    <div
      class="worker-card"
      data-worker-id="${escapeHTML(worker.id)}"
    >

      <div class="worker-photo-wrap">
        ${imageHTML}
      </div>

      <div class="worker-info">

        <div class="worker-name">
          ${name}
        </div>

        <div class="worker-service">
          ${getServiceIcon(worker.service)}
          ${service}
        </div>

        <div class="worker-meta">
          <span>📍 ${area}</span>
          <span>💼 ${experience} yrs</span>
        </div>

        ${
          charge !== "" &&
          charge !== null &&
          charge !== undefined
            ? `
              <div class="worker-charge">
                Starting ₹${escapeHTML(charge)}
              </div>
            `
            : ""
        }

        <div class="worker-buttons">

          <button
            class="worker-action-btn view-profile-btn"
            data-worker-id="${escapeHTML(worker.id)}"
          >
            View Profile
          </button>

        </div>

      </div>
    </div>
  `;
}


// ============================================================
// BUTTON EVENTS
// ============================================================

function setupWorkerButtons(workers) {

  document
    .querySelectorAll(".view-profile-btn")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.stopPropagation();

        const workerId = button.dataset.workerId;

        const worker = workers.find(
          item => String(item.id) === String(workerId)
        );

        if (worker) {
          openWorkerProfile(worker);
        }
      });
    });
}


// ============================================================
// WORKER PROFILE
// ============================================================

function openWorkerProfile(worker) {

  const oldModal = document.getElementById("worker-profile-modal");

  if (oldModal) {
    oldModal.remove();
  }

  const photo = getWorkerPhoto(worker);
  const charge = getStartingCharge(worker);

  const name = escapeHTML(worker.name || "Worker");
  const service = escapeHTML(worker.service || "Service");
  const area = escapeHTML(worker.area || "Area");
  const experience = escapeHTML(worker.experience || "0");
  const description = escapeHTML(
    worker.description || "No description available."
  );
  const mobile = String(worker.mobile || "").trim();

  const photoHTML = photo
    ? `
      <img
        src="${escapeHTML(photo)}"
        alt="${name}"
        class="profile-photo"
      >
    `
    : `
      <div class="profile-photo-placeholder">
        ${getServiceIcon(worker.service)}
      </div>
    `;

  const modal = document.createElement("div");

  modal.id = "worker-profile-modal";

  modal.innerHTML = `
    <div class="profile-modal-overlay">

      <div class="profile-modal">

        <button
          class="profile-close-btn"
          type="button"
        >
          ×
        </button>

        <div class="profile-photo-container">
          ${photoHTML}
        </div>

        <h2>${name}</h2>

        <div class="profile-service">
          ${getServiceIcon(worker.service)}
          ${service}
        </div>

        <div class="profile-details">

          <div>
            <strong>📍 Area</strong>
            <span>${area}</span>
          </div>

          <div>
            <strong>💼 Experience</strong>
            <span>${experience} years</span>
          </div>

          ${
            charge !== "" &&
            charge !== null &&
            charge !== undefined
              ? `
                <div>
                  <strong>💰 Starting Charge</strong>
                  <span>₹${escapeHTML(charge)}</span>
                </div>
              `
              : ""
          }

          <div>
            <strong>📝 About</strong>
            <span>${description}</span>
          </div>

        </div>

        <div class="profile-actions">

          ${
            mobile
              ? `
                <a
                  class="profile-call-btn"
                  href="tel:${escapeHTML(mobile)}"
                >
                  📞 Call
                </a>

                <a
                  class="profile-whatsapp-btn"
                  href="https://wa.me/91${mobile.replace(/\D/g, "")}"
                  target="_blank"
                  rel="noopener"
                >
                  💬 WhatsApp
                </a>
              `
              : ""
          }

          <button
            class="profile-request-btn"
            type="button"
          >
            Request Service
          </button>

        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".profile-close-btn")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal
    .querySelector(".profile-modal-overlay")
    .addEventListener("click", event => {
      if (event.target.classList.contains("profile-modal-overlay")) {
        modal.remove();
      }
    });

  modal
    .querySelector(".profile-request-btn")
    .addEventListener("click", () => {

      modal.remove();

      openRequestService(worker);
    });
}


// ============================================================
// REQUEST SERVICE
// ============================================================

function openRequestService(worker) {

  const oldModal = document.getElementById(
    "request-service-modal"
  );

  if (oldModal) {
    oldModal.remove();
  }

  const modal = document.createElement("div");

  modal.id = "request-service-modal";

  modal.innerHTML = `
    <div class="request-modal-overlay">

      <div class="request-modal">

        <button
          class="request-close-btn"
          type="button"
        >
          ×
        </button>

        <h2>Request Service</h2>

        <p class="request-worker-name">
          Requesting:
          <strong>
            ${escapeHTML(worker.name || "Worker")}
          </strong>
        </p>

        <form id="request-service-form">

          <label>
            Your Name
          </label>

          <input
            type="text"
            id="customer-name"
            required
            placeholder="Enter your name"
          >

          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            id="customer-mobile"
            required
            placeholder="Enter mobile number"
          >

          <label>
            Service
          </label>

          <input
            type="text"
            value="${escapeHTML(worker.service || "")}"
            readonly
          >

          <label>
            Your Area
          </label>

          <input
            type="text"
            id="customer-area"
            required
            placeholder="Enter your area"
          >

          <label>
            Request Details
          </label>

          <textarea
            id="request-details"
            placeholder="Tell the worker what you need..."
          ></textarea>

          <button
            type="submit"
            class="submit-request-btn"
          >
            Send Request
          </button>

          <div
            id="request-status"
            class="request-status"
          ></div>

        </form>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".request-close-btn")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal
    .querySelector(".request-modal-overlay")
    .addEventListener("click", event => {
      if (event.target.classList.contains("request-modal-overlay")) {
        modal.remove();
      }
    });

  const form = modal.querySelector("#request-service-form");

  form.addEventListener("submit", async event => {

    event.preventDefault();

    const customerName =
      document.getElementById("customer-name").value.trim();

    const customerMobile =
      document.getElementById("customer-mobile").value.trim();

    const customerArea =
      document.getElementById("customer-area").value.trim();

    const requestDetails =
      document.getElementById("request-details").value.trim();

    const statusBox =
      document.getElementById("request-status");

    const submitButton =
      form.querySelector(".submit-request-btn");

    if (!customerName || !customerMobile || !customerArea) {
      statusBox.textContent =
        "Please fill all required fields.";

      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    statusBox.textContent = "";

    try {

      const { error } = await supabaseClient
        .from("service_requests")
        .insert([
          {
            worker_id: worker.id,
            customer_name: customerName,
            customer_mobile: customerMobile,
            service: worker.service,
            area: customerArea,
            request_details: requestDetails,
            status: "pending"
          }
        ]);

      if (error) {
        console.error("Request insert error:", error);

        statusBox.textContent =
          "Request send nahi ho paayi. Please try again.";

        submitButton.disabled = false;
        submitButton.textContent = "Send Request";

        return;
      }

      statusBox.textContent =
        "Request sent successfully!";

      statusBox.classList.add("success");

      submitButton.textContent = "Request Sent";

      setTimeout(() => {
        modal.remove();
      }, 1500);

    } catch (error) {

      console.error(error);

      statusBox.textContent =
        "Something went wrong. Please try again.";

      submitButton.disabled = false;
      submitButton.textContent = "Send Request";
    }
  });
}


// ============================================================
// REQUEST SERVICE CSS
// Only styles dynamically required by request/profile modals.
// Existing style.css is not changed.
// ============================================================

(function injectModalStyles() {

  if (document.getElementById("findworker-modal-styles")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "findworker-modal-styles";

  style.textContent = `

    .profile-modal-overlay,
    .request-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 99999;
    }

    .profile-modal,
    .request-modal {
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow-y: auto;
      background: #fff;
      border-radius: 22px;
      padding: 24px;
      position: relative;
      box-sizing: border-box;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
    }

    .profile-close-btn,
    .request-close-btn {
      position: absolute;
      right: 14px;
      top: 12px;
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 50%;
      background: #f2f4f7;
      font-size: 24px;
      cursor: pointer;
      z-index: 2;
    }

    .profile-photo-container {
      width: 120px;
      height: 120px;
      margin: 5px auto 16px;
      border-radius: 50%;
      overflow: hidden;
      background: #eef3f8;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .profile-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .profile-photo-placeholder,
    .worker-photo-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      background: #eef3f8;
    }

    .profile-modal h2 {
      text-align: center;
      margin: 0 0 6px;
    }

    .profile-service {
      text-align: center;
      font-weight: 600;
      margin-bottom: 18px;
    }

    .profile-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .profile-details > div {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #f7f9fb;
    }

    .profile-details strong {
      font-size: 13px;
    }

    .profile-details span {
      font-size: 14px;
      line-height: 1.4;
    }

    .profile-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-top: 18px;
    }

    .profile-actions a,
    .profile-request-btn {
      flex: 1;
      min-width: 110px;
      border: 0;
      border-radius: 12px;
      padding: 12px 10px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      font-weight: 600;
      box-sizing: border-box;
    }

    .profile-call-btn {
      background: #edf7ef;
      color: #16833b;
    }

    .profile-whatsapp-btn {
      background: #eaf8ef;
      color: #128c45;
    }

    .profile-request-btn {
      background: #1769e0;
      color: white;
    }

    .request-modal h2 {
      margin: 0 0 8px;
    }

    .request-worker-name {
      margin: 0 0 18px;
      color: #555;
    }

    #request-service-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #request-service-form label {
      font-size: 14px;
      font-weight: 600;
      margin-top: 6px;
    }

    #request-service-form input,
    #request-service-form textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #d7dde5;
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      outline: none;
      font-family: inherit;
    }

    #request-service-form input:focus,
    #request-service-form textarea:focus {
      border-color: #1769e0;
    }

    #request-service-form textarea {
      min-height: 90px;
      resize: vertical;
    }

    .submit-request-btn {
      margin-top: 10px;
      border: 0;
      border-radius: 12px;
      padding: 13px;
      background: #1769e0;
      color: white;
      font-weight: 700;
      cursor: pointer;
    }

    .submit-request-btn:disabled {
      opacity: .65;
      cursor: not-allowed;
    }

    .request-status {
      min-height: 20px;
      text-align: center;
      font-size: 14px;
      margin-top: 5px;
    }

    .request-status.success {
      color: #16833b;
      font-weight: 600;
    }

    @media (max-width: 480px) {

      .profile-modal,
      .request-modal {
        padding: 20px 16px;
        border-radius: 18px;
      }

      .profile-actions {
        flex-direction: column;
      }

      .profile-actions a,
      .profile-request-btn {
        width: 100%;
      }
    }

  `;

  document.head.appendChild(style);

})();


// ============================================================
// INITIAL LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  loadWorkers();
});
