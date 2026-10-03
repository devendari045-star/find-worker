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
   SERVICE SUGGESTIONS
========================= */

if (serviceSearch) {
  serviceSearch.addEventListener("input", () => {
    const value = serviceSearch.value.trim().toLowerCase();

    if (!serviceSuggestions) return;

    if (!value) {
      serviceSuggestions.innerHTML = "";
      serviceSuggestions.style.display = "none";
      return;
    }

    const matches = ALL_SERVICES.filter(service =>
      service.toLowerCase().includes(value)
    ).slice(0, 8);

    if (!matches.length) {
      serviceSuggestions.innerHTML = "";
      serviceSuggestions.style.display = "none";
      return;
    }

    serviceSuggestions.innerHTML = matches
      .map(service => `
        <div class="service-suggestion-item" data-service="${escapeHTML(service)}">
          ${getServiceIcon(service)} ${escapeHTML(service)}
        </div>
      `)
      .join("");

    serviceSuggestions.style.display = "block";

    serviceSuggestions
      .querySelectorAll(".service-suggestion-item")
      .forEach(item => {
        item.addEventListener("click", () => {
          serviceSearch.value = item.dataset.service;
          serviceSuggestions.innerHTML = "";
          serviceSuggestions.style.display = "none";

          loadWorkers(item.dataset.service);
        });
      });
  });
}

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

    if (serviceFilter && serviceFilter.trim()) {
      query = query.ilike("service", `%${serviceFilter.trim()}%`);
    }

    const { data, error } = await query;

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
      .map(worker => createWorkerCard(worker))
      .join("");

    workerList
      .querySelectorAll("[data-worker-id]")
      .forEach(card => {
        card.addEventListener("click", () => {
          const id = Number(card.dataset.workerId);
          const worker = data.find(item => Number(item.id) === id);

          if (worker) {
            openWorkerProfile(worker);
          }
        });
      });

  } catch (error) {
    console.error("Worker loading error:", error);

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
  const photo = getWorkerPhoto(worker);
  const startingCharge =
    worker["starting charge"] ?? worker.starting_charge ?? "";

  const experience = worker.experience ?? "";
  const availability = worker.availability ?? "";
  const area = worker.area ?? "";

  return `
    <div class="worker-card" data-worker-id="${Number(worker.id)}">

      <div class="worker-photo">
        ${
          photo
            ? `<img src="${escapeHTML(photo)}" alt="${escapeHTML(worker.name)}">`
            : `<div class="worker-photo-placeholder">
                ${getServiceIcon(worker.service)}
              </div>`
        }
      </div>

      <div class="worker-card-content">

        <h3>${escapeHTML(worker.name || "Worker")}</h3>

        <div class="worker-service">
          ${getServiceIcon(worker.service)}
          ${escapeHTML(worker.service || "Service")}
        </div>

        <div class="worker-meta">
          <span>📍 ${escapeHTML(area || "Area not specified")}</span>
        </div>

        <div class="worker-meta">
          <span>💼 ${escapeHTML(experience || "Experience not specified")} years</span>
        </div>

        ${
          startingCharge
            ? `<div class="worker-charge">
                Starting ₹${escapeHTML(startingCharge)}
              </div>`
            : ""
        }

        ${
          availability
            ? `<div class="worker-availability">
                ${escapeHTML(availability)}
              </div>`
            : ""
        }

      </div>
    </div>
  `;
}

/* =========================
   WORKER PROFILE MODAL
========================= */

function openWorkerProfile(worker) {
  closeAllModals();

  const photo = getWorkerPhoto(worker);
  const startingCharge =
    worker["starting charge"] ?? worker.starting_charge ?? "";

  const modal = document.createElement("div");
  modal.className = "fw-modal-overlay";
  modal.id = "worker-profile-modal";

  modal.innerHTML = `
    <div class="fw-modal">

      <button class="fw-modal-close" id="close-worker-profile">
        ×
      </button>

      <div class="fw-profile-header">

        <div class="fw-profile-photo">
          ${
            photo
              ? `<img src="${escapeHTML(photo)}" alt="${escapeHTML(worker.name)}">`
              : `<div class="worker-photo-placeholder">
                  ${getServiceIcon(worker.service)}
                </div>`
          }
        </div>

        <h2>${escapeHTML(worker.name || "Worker")}</h2>

        <div class="fw-profile-service">
          ${getServiceIcon(worker.service)}
          ${escapeHTML(worker.service || "")}
        </div>

      </div>

      <div class="fw-profile-details">

        <div>
          <strong>📍 Area</strong>
          <span>${escapeHTML(worker.area || "Not specified")}</span>
        </div>

        <div>
          <strong>💼 Experience</strong>
          <span>${escapeHTML(worker.experience || "0")} years</span>
        </div>

        ${
          startingCharge
            ? `
              <div>
                <strong>💰 Starting Charge</strong>
                <span>₹${escapeHTML(startingCharge)}</span>
              </div>
            `
            : ""
        }

        <div>
          <strong>🕒 Availability</strong>
          <span>${escapeHTML(worker.availability || "Not specified")}</span>
        </div>

        ${
          worker.description
            ? `
              <div>
                <strong>📝 About</strong>
                <span>${escapeHTML(worker.description)}</span>
              </div>
            `
            : ""
        }

      </div>

      <div class="fw-profile-actions">

        <a
          class="fw-action-call"
          href="tel:${escapeHTML(worker.mobile || "")}"
        >
          📞 Call
        </a>

        <a
          class="fw-action-whatsapp"
          href="https://wa.me/${formatWhatsAppNumber(worker.mobile)}"
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
    .getElementById("close-worker-profile")
    .addEventListener("click", () => modal.remove());

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document
    .getElementById("request-service-btn")
    .addEventListener("click", () => {
      modal.remove();
      openRequestServiceModal(worker);
    });
}

function formatWhatsAppNumber(number) {
  let value = String(number || "").replace(/\D/g, "");

  if (value.length === 10) {
    value = "91" + value;
  }

  return value;
}

/* =========================
   REQUEST SERVICE
========================= */

function openRequestServiceModal(worker) {
  closeAllModals();

  injectRequestModalStyles();

  const modal = document.createElement("div");
  modal.className = "fw-modal-overlay";
  modal.id = "request-service-modal";

  modal.innerHTML = `
    <div class="fw-modal fw-request-modal">

      <button class="fw-modal-close" id="close-request-modal">
        ×
      </button>

      <div class="fw-request-header">
        <div class="fw-request-icon">🛠️</div>
        <h2>Request Service</h2>
        <p>
          Send your service request directly to
          <strong>${escapeHTML(worker.name)}</strong>
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
            value="${escapeHTML(worker.service || "")}"
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

        <button type="submit" class="fw-submit-request">
          Send Request
        </button>

        <div id="request-form-message"></div>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById("close-request-modal")
    .addEventListener("click", () => modal.remove());

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document
    .getElementById("request-service-form")
    .addEventListener("submit", event => {
      submitServiceRequest(event, worker);
    });
}

async function submitServiceRequest(event, worker) {
  event.preventDefault();

  const message = document.getElementById("request-form-message");
  const submitButton = event.target.querySelector("button[type='submit']");

  const customerName =
    document.getElementById("customer-name").value.trim();

  const customerMobile =
    document.getElementById("customer-mobile").value.trim();

  const customerArea =
    document.getElementById("customer-area").value.trim();

  const requestDetails =
    document.getElementById("request-details").value.trim();

  if (!/^\d{10}$/.test(customerMobile)) {
    message.innerHTML = `
      <div class="fw-error-message">
        Please enter a valid 10 digit mobile number.
      </div>
    `;
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const { error } = await supabaseClient
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
        ${escapeHTML(worker.name)} will receive your service request.
      </div>
    `;

    event.target.reset();

    setTimeout(() => {
      const modal = document.getElementById("request-service-modal");
      if (modal) modal.remove();
    }, 2200);

  } catch (error) {
    console.error("Request error:", error);

    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Unable to send request. Please try again.
      </div>
    `;

    submitButton.disabled = false;
    submitButton.textContent = "Send Request";
  }
}

/* =========================
   WORKER REGISTRATION
========================= */

function openWorkerRegistration() {
  closeAllModals();

  injectWorkerRegistrationStyles();

  const modal = document.createElement("div");
  modal.className = "fw-modal-overlay";
  modal.id = "worker-registration-modal";

  modal.innerHTML = `
    <div class="fw-modal fw-registration-modal">

      <button class="fw-modal-close" id="close-registration-modal">
        ×
      </button>

      <div class="fw-registration-header">
        <div class="fw-registration-icon">👷</div>
        <h2>Register as a Worker</h2>
        <p>
          Add your service details and get discovered by customers.
        </p>
      </div>

      <form id="worker-registration-form">

        <label>
          Full Name *
          <input
            type="text"
            id="worker-name"
            required
            placeholder="Enter your full name"
          >
        </label>

        <label>
          Mobile Number *
          <input
            type="tel"
            id="worker-mobile"
            required
            maxlength="10"
            placeholder="10 digit mobile number"
          >
        </label>

        <label>
          Service *
          <select id="worker-service" required>
            <option value="">Select your service</option>

            ${ALL_SERVICES.map(service => `
              <option value="${escapeHTML(service)}">
                ${escapeHTML(service)}
              </option>
            `).join("")}

          </select>
        </label>

        <label>
          Area *
          <input
            type="text"
            id="worker-area"
            required
            placeholder="Enter your service area"
          >
        </label>

        <label>
          Experience (Years) *
          <input
            type="number"
            id="worker-experience"
            required
            min="0"
            max="60"
            step="0.5"
            placeholder="Example: 5"
          >
        </label>

        <div
          id="experience-proof-info"
          class="fw-proof-info"
        >
          📄 Experience proof is optional for 1–5 years.
          <br>
          For <strong>6 years or more</strong>, proof is mandatory.
        </div>

        <label>
          Starting Charge
          <input
            type="text"
            id="worker-charge"
            placeholder="Example: 300"
          >
        </label>

        <label>
          Availability
          <input
            type="text"
            id="worker-availability"
            placeholder="Example: Mon-Sat, 9 AM - 7 PM"
          >
        </label>

        <label>
          Description
          <textarea
            id="worker-description"
            placeholder="Tell customers about your work..."
          ></textarea>
        </label>

        <label>
          Worker Photo
          <input
            type="file"
            id="worker-photo"
            accept="image/*"
          >
        </label>

        <label>
          Experience Proof
          <input
            type="file"
            id="worker-experience-proof"
            accept="image/*,.pdf"
          >
          <small id="proof-required-text">
            Optional for 1–5 years.
          </small>
        </label>

        <div
          id="worker-registration-message"
          class="fw-registration-message"
        ></div>

        <button
          type="submit"
          class="fw-submit-worker"
        >
          Register as Worker
        </button>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById("close-registration-modal")
    .addEventListener("click", () => modal.remove());

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  const experienceInput =
    document.getElementById("worker-experience");

  const proofInput =
    document.getElementById("worker-experience-proof");

  const proofText =
    document.getElementById("proof-required-text");

  function updateProofRequirement() {
    const experience = Number(experienceInput.value);

    if (experience >= 6) {
      proofInput.required = true;

      proofText.innerHTML = `
        <strong style="color:#dc2626;">
          Required: 6+ years experience needs proof.
        </strong>
      `;
    } else {
      proofInput.required = false;

      proofText.textContent =
        "Optional for 1–5 years.";
    }
  }

  experienceInput.addEventListener(
    "input",
    updateProofRequirement
  );

  document
    .getElementById("worker-registration-form")
    .addEventListener(
      "submit",
      submitWorkerRegistration
    );
}

/* =========================
   SUBMIT WORKER REGISTRATION
========================= */

async function submitWorkerRegistration(event) {
  event.preventDefault();

  const form = event.target;

  const message =
    document.getElementById("worker-registration-message");

  const submitButton =
    form.querySelector("button[type='submit']");

  const name =
    document.getElementById("worker-name").value.trim();

  const mobile =
    document.getElementById("worker-mobile").value.trim();

  const service =
    document.getElementById("worker-service").value.trim();

  const area =
    document.getElementById("worker-area").value.trim();

  const experience =
    Number(document.getElementById("worker-experience").value);

  const startingCharge =
    document.getElementById("worker-charge").value.trim();

  const availability =
    document.getElementById("worker-availability").value.trim();

  const description =
    document.getElementById("worker-description").value.trim();

  const photoFile =
    document.getElementById("worker-photo").files[0];

  const proofFile =
    document.getElementById("worker-experience-proof").files[0];

  if (!/^\d{10}$/.test(mobile)) {
    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Please enter a valid 10 digit mobile number.
      </div>
    `;
    return;
  }

  if (Number.isNaN(experience) || experience < 0) {
    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Please enter valid experience.
      </div>
    `;
    return;
  }

  /* 6+ YEARS = PROOF REQUIRED */

  if (experience >= 6 && !proofFile) {
    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Experience proof is mandatory for 6 years or more.
      </div>
    `;
    return;
  }

  /* FILE SIZE LIMIT */

  if (proofFile && proofFile.size > 10 * 1024 * 1024) {
    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Experience proof must be 10 MB or smaller.
      </div>
    `;
    return;
  }

  if (photoFile && photoFile.size > 5 * 1024 * 1024) {
    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Worker photo must be 5 MB or smaller.
      </div>
    `;
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Registering...";

  try {

    /* =========================
       UNIQUE ID FOR FILE NAMES
    ========================= */

    const uniqueId =
      `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    let photoUrl = "";
    let experienceProofPath = "";

    /* =========================
       PHOTO UPLOAD
    ========================= */

    if (photoFile) {

      const extension =
        getFileExtension(photoFile.name);

      const photoPath =
        `worker-photos/${uniqueId}.${extension}`;

      const { error: photoUploadError } =
        await supabaseClient.storage
          .from("experience-proofs")
          .upload(
            photoPath,
            photoFile,
            {
              cacheControl: "3600",
              upsert: false
            }
          );

      if (photoUploadError) {
        throw photoUploadError;
      }

      const {
        data: photoPublicData
      } =
        supabaseClient.storage
          .from("experience-proofs")
          .getPublicUrl(photoPath);

      photoUrl =
        photoPublicData?.publicUrl || "";
    }

    /* =========================
       EXPERIENCE PROOF UPLOAD
    ========================= */

    if (proofFile) {

      const extension =
        getFileExtension(proofFile.name);

      const proofPath =
        `experience-proofs/${uniqueId}.${extension}`;

      const { error: proofUploadError } =
        await supabaseClient.storage
          .from("experience-proofs")
          .upload(
            proofPath,
            proofFile,
            {
              cacheControl: "3600",
              upsert: false
            }
          );

      if (proofUploadError) {
        throw proofUploadError;
      }

      experienceProofPath = proofPath;
    }

    /* =========================
       INSERT WORKER
    ========================= */

    const workerData = {
      name: name,
      mobile: mobile,
      service: service,
      area: area,
      experience: experience,
      "starting charge": startingCharge,
      availability: availability,
      description: description,
      verification_status: "pending",
      "photo url": photoUrl,
      experience_proof: experienceProofPath
    };

    const {
      error: workerInsertError
    } = await supabaseClient
      .from("workers")
      .insert(workerData);

    if (workerInsertError) {
      throw workerInsertError;
    }

    /* =========================
       SUCCESS
    ========================= */

    message.innerHTML = `
      <div class="fw-success-message">
        ✅ Registration submitted successfully!
        <br><br>
        Your profile is now <strong>pending verification</strong>.
        <br>
        It will appear to customers after approval.
      </div>
    `;

    form.reset();

    setTimeout(() => {
      const modal =
        document.getElementById(
          "worker-registration-modal"
        );

      if (modal) modal.remove();
    }, 3500);

  } catch (error) {

    console.error(
      "Worker registration error:",
      error
    );

    message.innerHTML = `
      <div class="fw-error-message">
        ❌ Registration failed.
        <br>
        ${escapeHTML(
          error?.message ||
          "Please try again."
        )}
      </div>
    `;

    submitButton.disabled = false;
    submitButton.textContent =
      "Register as Worker";
  }
}

/* =========================
   FILE EXTENSION
========================= */

function getFileExtension(filename) {
  const parts =
    String(filename || "").split(".");

  if (parts.length < 2) {
    return "file";
  }

  return parts.pop()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/* =========================
   PROFILE NAV → WORKER
   REGISTRATION
========================= */

function setupWorkerRegistrationButton() {

  const navItems =
    document.querySelectorAll(".nav-item");

  if (!navItems.length) return;

  /*
    Existing bottom navigation:
    Home / Search / Requests / Profile

    We keep the existing navigation and
    use Profile as the entry point for
    worker registration.
  */

  const profileNav =
    navItems[navItems.length - 1];

  if (!profileNav) return;

  profileNav.addEventListener("click", event => {

    event.preventDefault();

    openWorkerRegistration();
  });
}

/* =========================
   CLOSE MODALS
========================= */

function closeAllModals() {

  document
    .querySelectorAll(".fw-modal-overlay")
    .forEach(modal => modal.remove());
}

/* =========================
   REQUEST SERVICE CSS
========================= */

function injectRequestModalStyles() {

  if (document.getElementById("fw-request-styles")) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = "fw-request-styles";

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

    .fw-request-modal label,
    .fw-registration-modal label {
      display: block;
      margin-bottom: 14px;
      font-weight: 600;
      color: #334155;
    }

    .fw-request-modal input,
    .fw-request-modal textarea,
    .fw-registration-modal input,
    .fw-registration-modal textarea,
    .fw-registration-modal select {
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
    .fw-request-modal textarea:focus,
    .fw-registration-modal input:focus,
    .fw-registration-modal textarea:focus,
    .fw-registration-modal select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,.1);
    }

    .fw-request-modal textarea,
    .fw-registration-modal textarea {
      min-height: 90px;
      resize: vertical;
    }

    .fw-submit-request,
    .fw-submit-worker {
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

    .fw-submit-request:disabled,
    .fw-submit-worker:disabled {
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
   WORKER REGISTRATION CSS
========================= */

function injectWorkerRegistrationStyles() {

  if (document.getElementById("fw-registration-styles")) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = "fw-registration-styles";

  style.textContent = `
    .fw-registration-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .fw-registration-icon {
      font-size: 44px;
      margin-bottom: 5px;
    }

    .fw-registration-header h2 {
      margin: 5px 0;
      color: #0f172a;
    }

    .fw-registration-header p {
      color: #64748b;
      font-size: 14px;
      margin: 5px 20px;
    }

    .fw-proof-info {
      margin: -4px 0 15px;
      padding: 12px;
      border-radius: 12px;
      background: #eff6ff;
      color: #1d4ed8;
      font-size: 13px;
      line-height: 1.5;
    }

    .fw-registration-modal small {
      display: block;
      margin-top: 5px;
      color: #64748b;
      font-weight: 400;
    }

    .fw-submit-worker {
      margin-top: 5px;
    }

    .fw-registration-modal input[type="file"] {
      padding: 9px;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
}

/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {

  loadWorkers();

  setupWorkerRegistrationButton();

});
