const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* =========================
   SERVICES
========================= */

const ALL_SERVICES = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Repair",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "TV Repair",
  "RO Repair",
  "Cleaning",
  "Pest Control",
  "Driver",
  "Cook",
  "Gardener",
  "Mason",
  "Welder",
  "Mechanic",
  "Computer Repair",
  "Mobile Repair",
  "CCTV Installation",
  "Other"
];

/* =========================
   DOM
========================= */

const serviceSearch = document.getElementById("service-search");
const serviceSuggestions = document.getElementById("service-suggestions");
const workerList = document.getElementById("worker-list");

/* =========================
   HELPERS
========================= */

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
  const s = String(service || "").toLowerCase();

  if (s.includes("electric")) return "⚡";
  if (s.includes("plumb")) return "🔧";
  if (s.includes("carpent")) return "🪚";
  if (s.includes("paint")) return "🎨";
  if (s.includes("ac")) return "❄️";
  if (s.includes("refriger")) return "🧊";
  if (s.includes("washing")) return "🧺";
  if (s.includes("tv")) return "📺";
  if (s.includes("ro")) return "💧";
  if (s.includes("clean")) return "🧹";
  if (s.includes("pest")) return "🐜";
  if (s.includes("driver")) return "🚗";
  if (s.includes("cook")) return "👨‍🍳";
  if (s.includes("garden")) return "🌱";
  if (s.includes("mason")) return "🧱";
  if (s.includes("weld")) return "🔩";
  if (s.includes("mechanic")) return "🔧";
  if (s.includes("computer")) return "💻";
  if (s.includes("mobile")) return "📱";
  if (s.includes("cctv")) return "📹";

  return "🛠️";
}

function getWorkerPhoto(worker) {
  return worker["photo url"] || worker.photo_url || "";
}

/* =========================
   SERVICE SEARCH
   FIXED:
   NO EMOJI IN SEARCH SUGGESTIONS
========================= */

if (serviceSearch) {
  serviceSearch.addEventListener("input", () => {

    const value =
      serviceSearch.value.trim().toLowerCase();

    if (!serviceSuggestions) return;

    if (!value) {
      serviceSuggestions.innerHTML = "";
      serviceSuggestions.style.display = "none";
      return;
    }

    const matches = ALL_SERVICES
      .filter(service =>
        service.toLowerCase().includes(value)
      )
      .slice(0, 8);

    if (!matches.length) {
      serviceSuggestions.innerHTML = "";
      serviceSuggestions.style.display = "none";
      return;
    }

    /*
      IMPORTANT:
      No getServiceIcon() here.
      Search suggestions will show ONLY service names.
    */

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

          serviceSearch.value =
            item.dataset.service;

          serviceSuggestions.innerHTML = "";
          serviceSuggestions.style.display = "none";

          loadWorkers(item.dataset.service);
        });

      });
  });
}

/* =========================
   SEARCH ENTER
========================= */

if (serviceSearch) {
  serviceSearch.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;

    event.preventDefault();

    const value =
      serviceSearch.value.trim();

    serviceSuggestions.innerHTML = "";
    serviceSuggestions.style.display = "none";

    loadWorkers(value);
  });
}

/* =========================
   CLICK OUTSIDE SEARCH
========================= */

document.addEventListener("click", event => {

  if (!serviceSearch || !serviceSuggestions) return;

  if (
    event.target !== serviceSearch &&
    !serviceSuggestions.contains(event.target)
  ) {
    serviceSuggestions.innerHTML = "";
    serviceSuggestions.style.display = "none";
  }

});

/* =========================
   LOAD APPROVED WORKERS
========================= */

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

    if (
      serviceFilter &&
      serviceFilter.trim()
    ) {
      query = query.ilike(
        "service",
        `%${serviceFilter.trim()}%`
      );
    }

    const {
      data,
      error
    } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {

      workerList.innerHTML = `
        <div class="no-workers">
          <div style="font-size:42px;">🔍</div>
          <h3>No workers found</h3>
          <p>Try another service or area.</p>
        </div>
      `;

      return;
    }

    workerList.innerHTML = data
      .map(worker =>
        createWorkerCard(worker)
      )
      .join("");

    workerList
      .querySelectorAll("[data-worker-id]")
      .forEach(card => {

        card.addEventListener(
          "click",
          () => {

            const id =
              Number(card.dataset.workerId);

            const worker =
              data.find(
                item =>
                  Number(item.id) === id
              );

            if (worker) {
              openWorkerProfile(worker);
            }

          }
        );

      });

  } catch (error) {

    console.error(
      "Worker loading error:",
      error
    );

    workerList.innerHTML = `
      <div class="no-workers">
        <div style="font-size:42px;">⚠️</div>
        <h3>Something went wrong</h3>
        <p>Please try again.</p>
      </div>
    `;
  }
}

/* =========================
   WORKER CARD
========================= */

function createWorkerCard(worker) {

  const photo =
    getWorkerPhoto(worker);

  const startingCharge =
    worker["starting charge"] ??
    worker.starting_charge ??
    "";

  const experience =
    worker.experience ?? "";

  const availability =
    worker.availability ?? "";

  const area =
    worker.area ?? "";

  return `
    <div
      class="worker-card"
      data-worker-id="${Number(worker.id)}"
    >

      <div class="worker-photo">

        ${
          photo
            ? `
              <img
                src="${escapeHTML(photo)}"
                alt="${escapeHTML(worker.name)}"
              >
            `
            : `
              <div class="worker-photo-placeholder">
                ${getServiceIcon(worker.service)}
              </div>
            `
        }

      </div>

      <div class="worker-card-content">

        <h3>
          ${escapeHTML(
            worker.name || "Worker"
          )}
        </h3>

        <div class="worker-service">
          ${getServiceIcon(worker.service)}
          ${escapeHTML(
            worker.service || "Service"
          )}
        </div>

        <div class="worker-meta">
          <span>
            📍
            ${escapeHTML(
              area || "Area not specified"
            )}
          </span>
        </div>

        <div class="worker-meta">
          <span>
            💼
            ${escapeHTML(
              experience ||
              "Experience not specified"
            )}
            years
          </span>
        </div>

        ${
          startingCharge
            ? `
              <div class="worker-charge">
                Starting ₹${escapeHTML(
                  startingCharge
                )}
              </div>
            `
            : ""
        }

        ${
          availability
            ? `
              <div class="worker-availability">
                ${escapeHTML(
                  availability
                )}
              </div>
            `
            : ""
        }

      </div>

    </div>
  `;
}

/* =========================
   WORKER PROFILE
========================= */

function openWorkerProfile(worker) {

  closeAllModals();

  const photo =
    getWorkerPhoto(worker);

  const startingCharge =
    worker["starting charge"] ??
    worker.starting_charge ??
    "";

  const modal =
    document.createElement("div");

  modal.className =
    "fw-modal-overlay";

  modal.id =
    "worker-profile-modal";

  modal.innerHTML = `
    <div class="fw-modal">

      <button
        class="fw-modal-close"
        id="close-worker-profile"
      >
        ×
      </button>

      <div class="fw-profile-header">

        <div class="fw-profile-photo">

          ${
            photo
              ? `
                <img
                  src="${escapeHTML(photo)}"
                  alt="${escapeHTML(worker.name)}"
                >
              `
              : `
                <div class="worker-photo-placeholder">
                  ${getServiceIcon(worker.service)}
                </div>
              `
          }

        </div>

        <h2>
          ${escapeHTML(
            worker.name || "Worker"
          )}
        </h2>

        <div class="fw-profile-service">
          ${getServiceIcon(worker.service)}
          ${escapeHTML(
            worker.service || ""
          )}
        </div>

      </div>

      <div class="fw-profile-details">

        <div>
          <strong>📍 Area</strong>
          <span>
            ${escapeHTML(
              worker.area ||
              "Not specified"
            )}
          </span>
        </div>

        <div>
          <strong>💼 Experience</strong>
          <span>
            ${escapeHTML(
              worker.experience || "0"
            )}
            years
          </span>
        </div>

        ${
          startingCharge
            ? `
              <div>
                <strong>
                  💰 Starting Charge
                </strong>

                <span>
                  ₹${escapeHTML(
                    startingCharge
                  )}
                </span>
              </div>
            `
            : ""
        }

        <div>
          <strong>
            🕒 Availability
          </strong>

          <span>
            ${escapeHTML(
              worker.availability ||
              "Not specified"
            )}
          </span>
        </div>

        ${
          worker.description
            ? `
              <div>
                <strong>
                  📝 About
                </strong>

                <span>
                  ${escapeHTML(
                    worker.description
                  )}
                </span>
              </div>
            `
            : ""
        }

      </div>

      <div class="fw-profile-actions">

        <a
          class="fw-action-call"
          href="tel:${escapeHTML(
            worker.mobile || ""
          )}"
        >
          📞 Call
        </a>

        <a
          class="fw-action-whatsapp"
          href="https://wa.me/${formatWhatsAppNumber(
            worker.mobile
          )}"
          target="_blank"
          rel="noopener"
        >
          💬 WhatsApp
        </a>

        <button
          class="fw-action-request"
          id="request-service-btn"
        >
          🛠️ Request Service
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById(
      "close-worker-profile"
    )
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal.addEventListener(
    "click",
    event => {

      if (event.target === modal) {
        modal.remove();
      }

    }
  );

  document
    .getElementById(
      "request-service-btn"
    )
    .addEventListener(
      "click",
      () => {

        modal.remove();

        openRequestServiceModal(
          worker
        );

      }
    );
}

/* =========================
   WHATSAPP NUMBER
========================= */

function formatWhatsAppNumber(number) {

  let value =
    String(number || "")
      .replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

/* =========================
   REQUEST SERVICE MODAL
========================= */

function openRequestServiceModal(worker) {

  closeAllModals();

  injectRequestModalStyles();

  const modal =
    document.createElement("div");

  modal.className =
    "fw-modal-overlay";

  modal.id =
    "request-service-modal";

  modal.innerHTML = `
    <div class="fw-modal fw-request-modal">

      <button
        class="fw-modal-close"
        id="close-request-modal"
      >
        ×
      </button>

      <div class="fw-request-header">

        <div class="fw-request-icon">
          🛠️
        </div>

        <h2>
          Request Service
        </h2>

        <p>
          Send your service request directly to
          <strong>
            ${escapeHTML(
              worker.name
            )}
          </strong>
        </p>

      </div>

      <form id="request-service-form">

        <label>
          Your Name

          <input
            type="text"
            id="customer-name"
            required
            placeholder="Enter your name"
          >
        </label>

        <label>
          Mobile Number

          <input
            type="tel"
            id="customer-mobile"
            required
            maxlength="10"
            placeholder="Enter 10 digit mobile number"
          >
        </label>

        <label>
          Service

          <input
            type="text"
            value="${escapeHTML(
              worker.service || ""
            )}"
            readonly
          >
        </label>

        <label>
          Your Area

          <input
            type="text"
            id="customer-area"
            required
            placeholder="Enter your area"
          >
        </label>

        <label>
          Request Details

          <textarea
            id="request-details"
            placeholder="Describe what you need..."
          ></textarea>
        </label>

        <button
          type="submit"
          class="fw-submit-request"
        >
          Send Request
        </button>

        <div
          id="request-form-message"
        ></div>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById(
      "close-request-modal"
    )
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal.addEventListener(
    "click",
    event => {

      if (event.target === modal) {
        modal.remove();
      }

    }
  );

  document
    .getElementById(
      "request-service-form"
    )
    .addEventListener(
      "submit",
      event => {
        submitServiceRequest(
          event,
          worker
        );
      }
    );
}

/* =========================
   SUBMIT REQUEST
========================= */

async function submitServiceRequest(
  event,
  worker
) {

  event.preventDefault();

  const message =
    document.getElementById(
      "request-form-message"
    );

  const submitButton =
    event.target.querySelector(
      "button[type='submit']"
    );

  const customerName =
    document
      .getElementById("customer-name")
      .value
      .trim();

  const customerMobile =
    document
      .getElementById("customer-mobile")
      .value
      .trim();

  const customerArea =
    document
      .getElementById("customer-area")
      .value
      .trim();

  const requestDetails =
    document
      .getElementById("request-details")
      .value
      .trim();

  if (!/^\d{10}$/.test(
    customerMobile
  )) {

    message.innerHTML = `
      <div class="fw-error-message">
        Please enter a valid
        10 digit mobile number.
      </div>
    `;

    return;
  }

  submitButton.disabled = true;
  submitButton.textContent =
    "Sending...";

  try {

    const { error } =
      await supabaseClient
        .from("service_requests")
        .insert({
          worker_id: worker.id,
          customer_name: customerName,
          customer_mobile: customerMobile,
          service: worker.service,
          area: customerArea,
          request_details: requestDetails,
          status: "pending"
        });

    if (error) throw error;

    message.innerHTML = `
      <div class="fw-success-message">
        ✅ Request sent successfully!
        <br>
        ${escapeHTML(
          worker.name
        )}
        will receive your service request.
      </div>
    `;

    event.target.reset();

    setTimeout(() => {

      const modal =
        document.getElementById(
          "request-service-modal"
        );

      if (modal) {
        modal.remove();
      }

    }, 2200);

  } catch (error) {

    console.error(
      "Request error:",
      error
    );

    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Unable to send request.
        Please try again.
      </div>
    `;

    submitButton.disabled = false;

    submitButton.textContent =
      "Send Request";
  }
}

/* =========================
   CLOSE MODALS
========================= */

function closeAllModals() {

  document
    .querySelectorAll(
      ".fw-modal-overlay"
    )
    .forEach(modal =>
      modal.remove()
    );
}

/* =========================
   REQUEST MODAL CSS
========================= */

function injectRequestModalStyles() {

  if (
    document.getElementById(
      "fw-request-styles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "fw-request-styles";

  style.textContent = `

    .fw-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 18px;
    }

    .fw-modal {
      width: min(520px, 100%);
      max-height: 92vh;
      overflow-y: auto;
      background: #fff;
      border-radius: 22px;
      padding: 24px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
    }

    .fw-modal-close {
      position: absolute;
      right: 15px;
      top: 12px;
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 50%;
      background: #f1f5f9;
      font-size: 25px;
      cursor: pointer;
    }

    .fw-request-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .fw-request-icon {
      font-size: 42px;
      margin-bottom: 5px;
    }

    .fw-request-header h2 {
      margin: 5px 0;
    }

    .fw-request-header p {
      color: #64748b;
      font-size: 14px;
    }

    .fw-request-modal label {
      display: block;
      margin-bottom: 14px;
      font-weight: 600;
      color: #334155;
    }

    .fw-request-modal input,
    .fw-request-modal textarea {
      width: 100%;
      box-sizing: border-box;
      margin-top: 6px;
      padding: 12px 13px;
      border: 1px solid #dbe2ea;
      border-radius: 12px;
      outline: none;
      font: inherit;
      background: #fff;
    }

    .fw-request-modal input:focus,
    .fw-request-modal textarea:focus {
      border-color: #2563eb;
      box-shadow:
        0 0 0 3px
        rgba(37,99,235,.1);
    }

    .fw-request-modal textarea {
      min-height: 90px;
      resize: vertical;
    }

    .fw-submit-request {
      width: 100%;
      border: 0;
      border-radius: 13px;
      padding: 13px;
      background: #2563eb;
      color: white;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
    }

    .fw-submit-request:disabled {
      opacity: .65;
      cursor: not-allowed;
    }

    .fw-success-message {
      margin-top: 15px;
      padding: 13px;
      border-radius: 12px;
      background: #ecfdf5;
      color: #047857;
      text-align: center;
      font-size: 14px;
    }

    .fw-error-message {
      margin-top: 15px;
      padding: 13px;
      border-radius: 12px;
      background: #fef2f2;
      color: #b91c1c;
      text-align: center;
      font-size: 14px;
    }

  `;

  document.head.appendChild(style);
}

/* =========================
   INITIALIZE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadWorkers();

  }
);
