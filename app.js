/* =========================================================
   FINDWORKER
   APP VERSION 5 + WORKER REGISTRATION
========================================================= */

const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const ALL_SERVICES = [
  "AC Installation","AC Repair","AC Gas Filling","AC Service","AC Technician",
  "Aluminium Worker","Appliance Repair","Auto Mechanic","Bathroom Cleaning","Beautician","Bike Mechanic","Bike Wash",
  "Car Cleaning","Car Mechanic","Car Wash","Carpenter","CCTV Installation","CCTV Repair","Chimney Repair","Cleaner","Computer Repair","Computer Technician","Construction Worker","Cook",
  "Dance Teacher","DTH Technician","Electrician","Electrician Helper","Event Decoration","Fabrication Worker","False Ceiling Worker","Fitness Trainer","Furniture Repair",
  "Gardener","Gardening Service","Glass Worker","Geyser Repair","Home Cleaning","Home Tutor","Interior Designer","Internet Technician","Inverter Repair","Ironing Service",
  "Kitchen Cleaning","Labour","Laptop Repair","Laundry Service","Makeup Artist","Mason","Mechanic","Mehndi Artist","Microwave Repair","Mobile Repair","Mobile Technician",
  "Other Service","Packers & Movers","Painter","Pest Control","Photographer","Plumber","POP Worker","Printer Repair","Printer Technician",
  "Refrigerator Repair","RO Installation","RO Repair","RO Technician","Salon at Home","Security Guard","Sofa Cleaning","Solar Technician","Tailor","Tile Worker","TV Repair",
  "Washing Machine Repair","Water Purifier Repair","Water Tank Cleaning","Welder","Welder Fabricator","WiFi Technician","Yoga Trainer"
];

const searchInput = document.getElementById("service-search");
const suggestionBox = document.getElementById("service-suggestions");
const clearButton = document.getElementById("search-clear");
const workerList = document.getElementById("worker-list");
const categories = document.querySelectorAll(".category");
const bottomSearch = document.getElementById("bottom-search");

function getServiceIcon(service){
  const name = String(service || "").toLowerCase();

  if(name.includes("electric")) return "⚡";
  if(name.includes("plumb")) return "🚰";
  if(name.includes("ac ") || name.startsWith("ac")) return "❄️";
  if(name.includes("carpent")) return "🪚";
  if(name.includes("paint")) return "🎨";
  if(name.includes("clean")) return "🧹";
  if(name.includes("mobile")) return "📱";
  if(name.includes("computer") || name.includes("laptop")) return "💻";
  if(name.includes("mechanic") || name.includes("bike") || name.includes("car ") || name === "car") return "🔧";
  if(name.includes("cook")) return "👨‍🍳";
  if(name.includes("driver")) return "🚗";
  if(name.includes("cctv")) return "📹";
  if(name.includes("tailor")) return "🧵";
  if(name.includes("gard")) return "🌱";
  if(name.includes("teacher")) return "📚";
  if(name.includes("repair")) return "🛠️";
  if(name.includes("solar")) return "☀️";
  if(name.includes("yoga")) return "🧘";
  if(name.includes("photographer")) return "📷";

  return "👤";
}

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function getWorkerPhoto(worker){
  const photo = String(
    worker.photo_url ||
    worker["photo url"] ||
    ""
  ).trim();

  if(photo){
    return `
      <img
        src="${escapeHTML(photo)}"
        alt="${escapeHTML(worker.name)}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
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

function showServiceSuggestions(){
  const raw = searchInput.value.trim();
  const query = raw.toLowerCase();

  suggestionBox.innerHTML = "";

  if(!query){
    suggestionBox.classList.remove("show");
    clearButton.classList.remove("show");
    return;
  }

  clearButton.classList.add("show");

  const matches = ALL_SERVICES.filter(
    service => service.toLowerCase().startsWith(query)
  );

  if(!matches.length){
    suggestionBox.innerHTML = `
      <div class="no-service">
        No service found for
        "<strong>${escapeHTML(raw)}</strong>"
      </div>
    `;

    suggestionBox.classList.add("show");
    return;
  }

  matches.forEach(service => {
    const item = document.createElement("button");

    item.type = "button";
    item.className = "service-suggestion";

    item.innerHTML = `
      <div class="suggestion-icon">
        ${getServiceIcon(service)}
      </div>

      <div class="suggestion-name">
        ${escapeHTML(service)}
      </div>

      <div class="suggestion-letter">
        ${service.charAt(0)}
      </div>
    `;

    item.addEventListener("click",() => {
      searchInput.value = service;
      suggestionBox.classList.remove("show");
      clearButton.classList.add("show");
      loadWorkers(service);
    });

    suggestionBox.appendChild(item);
  });

  suggestionBox.classList.add("show");
}

async function loadWorkers(serviceFilter=""){
  workerList.innerHTML = `
    <div class="loading-card">
      <div class="loading-spinner"></div>

      <div>
        <strong>Finding workers...</strong>
        <small>Loading verified professionals</small>
      </div>
    </div>
  `;

  try{
    let query = supabaseClient
      .from("workers")
      .select("*")
      .eq("verification_status","approved");

    if(serviceFilter){
      query = query.ilike(
        "service",
        `%${serviceFilter}%`
      );
    }

    const {data,error} = await query;

    if(error){
      console.error("Supabase worker error:",error);
      showWorkerError();
      return;
    }

    workerList.innerHTML = "";

    if(!data || !data.length){
      showNoWorkers(serviceFilter);
      return;
    }

    data.forEach(createWorkerCard);

  }catch(error){
    console.error("Worker loading failed:",error);
    showWorkerError();
  }
}

function createWorkerCard(worker){
  const card = document.createElement("div");

  card.className = "worker";

  card.innerHTML = `
    <div class="worker-img">
      ${getWorkerPhoto(worker)}
    </div>

    <div class="worker-info">
      <h3>${escapeHTML(worker.service)}</h3>

      <p>
        ${escapeHTML(worker.name)}
        •
        ${escapeHTML(worker.area)}
      </p>

      <div class="rating">
        ⭐ Verified Provider
      </div>
    </div>

    <button
      type="button"
      class="view"
    >
      View
    </button>
  `;

  workerList.appendChild(card);

  card
    .querySelector(".view")
    .addEventListener(
      "click",
      () => showWorkerProfile(worker)
    );
}

function showNoWorkers(service){
  const serviceText = service
    ? escapeHTML(service)
    : "this service";

  workerList.innerHTML = `
    <div class="no-workers">
      <div class="empty-icon">
        🔎
      </div>

      <h3>
        No workers found
      </h3>

      <p>
        No approved worker is available
        for ${serviceText} yet.
      </p>
    </div>
  `;
}

function showWorkerError(){
  workerList.innerHTML = `
    <div class="no-workers">
      <div class="empty-icon">
        ⚠️
      </div>

      <h3>
        Unable to load workers
      </h3>

      <p>
        Please refresh the page and try again.
      </p>
    </div>
  `;
}

function showWorkerProfile(worker){
  const old =
    document.querySelector(".worker-profile");

  if(old){
    old.remove();
  }

  const profile =
    document.createElement("div");

  profile.className =
    "worker-profile";

  profile.innerHTML = `
    <div class="profile-box">

      <button
        type="button"
        class="close-profile"
        aria-label="Close"
      >
        ×
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
            String(
              worker.starting_charge ??
              worker["starting charge"] ??
              ""
            )
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

      <button
        type="button"
        class="fw-request-service-btn"
        data-worker-id="${escapeHTML(worker.id)}"
      >
        Request Service
      </button>

    </div>
  `;

  document.body.appendChild(profile);

  profile
    .querySelector(".close-profile")
    .addEventListener(
      "click",
      () => profile.remove()
    );

  profile
    .querySelector(".fw-request-service-btn")
    .addEventListener(
      "click",
      () => {
        profile.remove();
        openRequestServiceForm(worker);
      }
    );

  profile.addEventListener(
    "click",
    event => {
      if(event.target === profile){
        profile.remove();
      }
    }
  );
}

function openRequestServiceForm(worker){
  const old =
    document.querySelector(".fw-request-modal");

  if(old){
    old.remove();
  }

  const modal =
    document.createElement("div");

  modal.className =
    "fw-request-modal";

  modal.innerHTML = `
    <div class="fw-request-box">

      <button
        type="button"
        class="fw-request-close"
      >
        ×
      </button>

      <h2>
        Request Service
      </h2>

      <p class="fw-request-worker">
        Requesting:
        <strong>
          ${escapeHTML(worker.name)}
        </strong>
      </p>

      <form class="fw-request-form">

        <label>
          Your Name
        </label>

        <input
          type="text"
          class="fw-customer-name"
          required
          placeholder="Enter your name"
        >

        <label>
          Mobile Number
        </label>

        <input
          type="tel"
          class="fw-customer-mobile"
          required
          placeholder="Enter mobile number"
        >

        <label>
          Service
        </label>

        <input
          type="text"
          value="${escapeHTML(worker.service)}"
          readonly
        >

        <label>
          Your Area
        </label>

        <input
          type="text"
          class="fw-customer-area"
          required
          placeholder="Enter your area"
        >

        <label>
          Request Details
        </label>

        <textarea
          class="fw-request-details"
          placeholder="Tell the worker what you need..."
        ></textarea>

        <button
          type="submit"
          class="fw-request-submit"
        >
          Send Request
        </button>

        <div class="fw-request-message"></div>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".fw-request-close")
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal.addEventListener(
    "click",
    event => {
      if(event.target === modal){
        modal.remove();
      }
    }
  );

  modal
    .querySelector(".fw-request-form")
    .addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const form =
          event.currentTarget;

        const button =
          form.querySelector(
            ".fw-request-submit"
          );

        const message =
          form.querySelector(
            ".fw-request-message"
          );

        const customerName =
          form
            .querySelector(".fw-customer-name")
            .value
            .trim();

        const customerMobile =
          form
            .querySelector(".fw-customer-mobile")
            .value
            .trim();

        const customerArea =
          form
            .querySelector(".fw-customer-area")
            .value
            .trim();

        const requestDetails =
          form
            .querySelector(".fw-request-details")
            .value
            .trim();

        button.disabled = true;
        button.textContent = "Sending...";

        try{

          const {error} =
            await supabaseClient
              .from("service_requests")
              .insert({

                worker_id:
                  worker.id,

                customer_name:
                  customerName,

                customer_mobile:
                  customerMobile,

                service:
                  worker.service,

                area:
                  customerArea,

                request_details:
                  requestDetails,

                status:
                  "pending"

              });

          if(error){

            console.error(
              "Service request error:",
              error
            );

            message.textContent =
              "Request send nahi ho paayi.";

            button.disabled = false;

            button.textContent =
              "Send Request";

            return;
          }

          message.textContent =
            "Request sent successfully!";

          message.classList.add(
            "success"
          );

          button.textContent =
            "Request Sent";

          setTimeout(
            () => modal.remove(),
            1500
          );

        }catch(error){

          console.error(error);

          message.textContent =
            "Something went wrong.";

          button.disabled = false;

          button.textContent =
            "Send Request";

        }

      }
    );
}

searchInput.addEventListener(
  "input",
  showServiceSuggestions
);

clearButton.addEventListener(
  "click",
  () => {

    searchInput.value = "";

    clearButton.classList.remove(
      "show"
    );

    suggestionBox.innerHTML = "";

    suggestionBox.classList.remove(
      "show"
    );

    loadWorkers();

    searchInput.focus();

  }
);

categories.forEach(
  category => {

    category.addEventListener(
      "click",
      () => {

        const service =
          category.dataset.service;

        searchInput.value =
          service;

        clearButton.classList.add(
          "show"
        );

        suggestionBox.innerHTML =
          "";

        suggestionBox.classList.remove(
          "show"
        );

        loadWorkers(
          service
        );

        document
          .querySelector(
            ".nearby"
          )
          .scrollIntoView({
            behavior:"smooth",
            block:"start"
          });

      }
    );

  }
);

if(bottomSearch){

  bottomSearch.addEventListener(
    "click",
    () => {

      searchInput.focus();

      document
        .querySelector(
          ".header"
        )
        .scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

    }
  );

}

document.addEventListener(
  "click",
  event => {

    const insideSearch =
      event.target.closest(
        ".search"
      );

    const insideSuggestions =
      event.target.closest(
        ".service-suggestions"
      );

    if(
      !insideSearch &&
      !insideSuggestions
    ){

      suggestionBox.classList.remove(
        "show"
      );

    }

  }
);

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Escape"
    ){

      suggestionBox.classList.remove(
        "show"
      );

    }

  }
);


/* =========================================================
   WORKER PROFILE PHOTO
   PHOTO IS ADDED AFTER REGISTRATION
========================================================= */

function openWorkerPhotoUpload(
  modal,
  worker
){

  const registerBox =
    modal.querySelector(
      ".fw-worker-register-box"
    );

  if(!registerBox){
    return;
  }

  registerBox.innerHTML = `

    <button
      type="button"
      class="fw-worker-register-close"
    >
      ×
    </button>

    <div class="fw-register-header">

      <div class="fw-register-icon">
        ✅
      </div>

      <h2>
        Profile Created Successfully
      </h2>

      <p>
        Ab apni profile photo add karein.
      </p>

    </div>

    <div class="fw-photo-upload-step">

      <div
        class="fw-photo-preview"
        id="fw-photo-preview"
      >
        ${getServiceIcon(worker.service)}
      </div>

      <label>
        Profile Photo
      </label>

      <input
        type="file"
        id="fw-worker-profile-photo"
        accept=".jpg,.jpeg,.png,.webp"
      >

      <small>
        JPG, PNG ya WEBP. Maximum 5 MB.
      </small>

      <div
        id="fw-photo-upload-message"
        class="fw-register-message"
      ></div>

      <button
        type="button"
        id="fw-upload-profile-photo"
        class="fw-register-submit"
      >
        Upload Profile Photo
      </button>

      <button
        type="button"
        id="fw-skip-profile-photo"
        class="fw-skip-photo-btn"
      >
        Skip for Now
      </button>

    </div>
  `;

  const closeButton =
    registerBox.querySelector(
      ".fw-worker-register-close"
    );

  const photoInput =
    registerBox.querySelector(
      "#fw-worker-profile-photo"
    );

  const preview =
    registerBox.querySelector(
      "#fw-photo-preview"
    );

  const uploadButton =
    registerBox.querySelector(
      "#fw-upload-profile-photo"
    );

  const skipButton =
    registerBox.querySelector(
      "#fw-skip-profile-photo"
    );

  const message =
    registerBox.querySelector(
      "#fw-photo-upload-message"
    );

  closeButton.addEventListener(
    "click",
    () => modal.remove()
  );

  photoInput.addEventListener(
    "change",
    () => {

      const file =
        photoInput.files[0];

      if(!file){
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      if(
        !allowedTypes.includes(
          file.type
        )
      ){

        message.textContent =
          "Photo sirf JPG, PNG ya WEBP honi chahiye.";

        photoInput.value = "";

        return;
      }

      if(
        file.size >
        5 * 1024 * 1024
      ){

        message.textContent =
          "Profile photo maximum 5 MB ki ho sakti hai.";

        photoInput.value = "";

        return;
      }

      const reader =
        new FileReader();

      reader.onload =
        event => {

          preview.innerHTML = `
            <img
              src="${event.target.result}"
              alt="Profile preview"
            >
          `;

        };

      reader.readAsDataURL(
        file
      );

      message.textContent = "";

    }
  );

  skipButton.addEventListener(
    "click",
    () => {

      modal.remove();

    }
  );

  uploadButton.addEventListener(
    "click",
    async () => {

      const file =
        photoInput.files[0];

      if(!file){

        message.textContent =
          "Pehle profile photo select karein.";

        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      if(
        !allowedTypes.includes(
          file.type
        )
      ){

        message.textContent =
          "Photo sirf JPG, PNG ya WEBP honi chahiye.";

        return;
      }

      if(
        file.size >
        5 * 1024 * 1024
      ){

        message.textContent =
          "Profile photo maximum 5 MB ki ho sakti hai.";

        return;
      }

      uploadButton.disabled =
        true;

      skipButton.disabled =
        true;

      uploadButton.textContent =
        "Uploading...";

      message.textContent = "";

      try{

        const safeName =
          file.name.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
          );

        const uniqueName =
          `${worker.id}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2,10)}-${safeName}`;

        const storagePath =
          `worker-profile/${uniqueName}`;

        const {
          error:
            uploadError
        } =
          await supabaseClient
            .storage
            .from(
              "worker-photos"
            )
            .upload(
              storagePath,
              file,
              {
                cacheControl:
                  "3600",
                upsert:
                  false,
                contentType:
                  file.type
              }
            );

        if(uploadError){

          console.error(
            "Worker profile photo upload error:",
            uploadError
          );

          message.textContent =
            "Profile photo upload nahi ho paayi. Please try again.";

          uploadButton.disabled =
            false;

          skipButton.disabled =
            false;

          uploadButton.textContent =
            "Upload Profile Photo";

          return;
        }

        const {
          data:
            publicData
        } =
          supabaseClient
            .storage
            .from(
              "worker-photos"
            )
            .getPublicUrl(
              storagePath
            );

        const publicPhotoURL =
          publicData &&
          publicData.publicUrl
            ? publicData.publicUrl
            : "";

        if(!publicPhotoURL){

          message.textContent =
            "Photo URL create nahi ho paaya.";

          uploadButton.disabled =
            false;

          skipButton.disabled =
            false;

          uploadButton.textContent =
            "Upload Profile Photo";

          return;
        }

        const {
          error:
            updateError
        } =
          await supabaseClient
            .from("workers")
            .update({
              photo_url:
                publicPhotoURL
            })
            .eq(
              "id",
              worker.id
            )
            .eq(
              "verification_status",
              "pending"
            )
            .is(
              "photo_url",
              null
            );

        if(updateError){

          console.error(
            "Worker photo database update error:",
            updateError
          );

          message.textContent =
            "Photo upload ho gayi, lekin profile me save nahi ho paayi.";

          uploadButton.disabled =
            false;

          skipButton.disabled =
            false;

          uploadButton.textContent =
            "Upload Profile Photo";

          return;
        }

        message.className =
          "fw-register-message success";

        message.innerHTML = `
          <strong>
            Profile photo added successfully!
          </strong>

          <br>

          Aapki profile verification ke liye pending hai.
        `;

        uploadButton.textContent =
          "Photo Added";

        setTimeout(
          () => modal.remove(),
          1800
        );

      }catch(error){

        console.error(
          "Worker profile photo failed:",
          error
        );

        message.textContent =
          "Something went wrong. Please try again.";

        uploadButton.disabled =
          false;

        skipButton.disabled =
          false;

        uploadButton.textContent =
          "Upload Profile Photo";

      }

    }
  );

}


/* =========================================================
   WORKER REGISTRATION
========================================================= */

function openWorkerRegistration(){

  const old =
    document.getElementById(
      "fw-worker-registration"
    );

  if(old){
    old.remove();
  }

  const modal =
    document.createElement(
      "div"
    );

  modal.id =
    "fw-worker-registration";

  modal.innerHTML = `

    <div class="fw-worker-register-overlay">

      <div class="fw-worker-register-box">

        <button
          type="button"
          class="fw-worker-register-close"
        >
          ×
        </button>

        <div class="fw-register-header">

          <div class="fw-register-icon">
            👷
          </div>

          <h2>
            Register as a Worker
          </h2>

          <p>
            Apni service FindWorker par add karein.
          </p>

        </div>

        <form
          id="fw-worker-register-form"
        >

          <label>
            Full Name *
          </label>

          <input
            type="text"
            id="fw-worker-name"
            required
            placeholder="Enter your full name"
          >

          <label>
            Mobile Number *
          </label>

          <input
            type="tel"
            id="fw-worker-mobile"
            required
            inputmode="numeric"
            placeholder="Enter mobile number"
          >

          <label>
            Service *
          </label>

          <select
            id="fw-worker-service"
            required
          >

            <option value="">
              Select your service
            </option>

            ${ALL_SERVICES.map(
              service => `
                <option value="${escapeHTML(service)}">
                  ${escapeHTML(service)}
                </option>
              `
            ).join("")}

          </select>

          <label>
            Area *
          </label>

          <input
            type="text"
            id="fw-worker-area"
            required
            placeholder="Enter your area"
          >

          <label>
            Experience (Years) *
          </label>

          <input
            type="number"
            id="fw-worker-experience"
            required
            min="0"
            max="100"
            step="1"
            placeholder="Example: 5"
          >

          <div
            id="fw-experience-note"
            class="fw-experience-note"
          >
            Experience proof is required only for 6 years or more.
          </div>

          <div
            id="fw-proof-section"
            class="fw-proof-section"
          >

            <label>
              Experience Proof *
            </label>

            <input
              type="file"
              id="fw-experience-proof"
              accept=".jpg,.jpeg,.png,.pdf"
            >

            <small>
              6+ years experience ke liye proof mandatory hai.
              JPG, PNG ya PDF.
            </small>

          </div>

          <label>
            Starting Charge *
          </label>

          <input
            type="number"
            id="fw-worker-charge"
            required
            min="0"
            placeholder="Example: 500"
          >

          <label>
            Availability *
          </label>

          <select
            id="fw-worker-availability"
            required
          >

            <option value="">
              Select availability
            </option>

            <option value="Available Now">
              Available Now
            </option>

            <option value="Available Today">
              Available Today
            </option>

            <option value="Available Tomorrow">
              Available Tomorrow
            </option>

            <option value="By Appointment">
              By Appointment
            </option>

          </select>

          <label>
            About / Description
          </label>

          <textarea
            id="fw-worker-description"
            rows="4"
            placeholder="Apne experience aur service ke baare mein likhein..."
          ></textarea>

          <div
            id="fw-register-message"
            class="fw-register-message"
          ></div>

          <button
            type="submit"
            id="fw-register-submit"
            class="fw-register-submit"
          >
            Register Worker
          </button>

        </form>

      </div>

    </div>
  `;

  document.body.appendChild(
    modal
  );

  modal
    .querySelector(
      ".fw-worker-register-close"
    )
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal
    .querySelector(
      ".fw-worker-register-overlay"
    )
    .addEventListener(
      "click",
      event => {

        if(
          event.target.classList.contains(
            "fw-worker-register-overlay"
          )
        ){

          modal.remove();

        }

      }
    );

  const experienceInput =
    modal.querySelector(
      "#fw-worker-experience"
    );

  const proofSection =
    modal.querySelector(
      "#fw-proof-section"
    );

  const proofInput =
    modal.querySelector(
      "#fw-experience-proof"
    );

  function updateProofRequirement(){

    const years =
      Number(
        experienceInput.value
      );

    const required =
      Number.isFinite(years) &&
      years >= 6;

    proofSection.classList.toggle(
      "required",
      required
    );

    proofInput.required =
      required;

  }

  experienceInput.addEventListener(
    "input",
    updateProofRequirement
  );

  modal
    .querySelector(
      "#fw-worker-register-form"
    )
    .addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const form =
          event.currentTarget;

        const submitButton =
          form.querySelector(
            "#fw-register-submit"
          );

        const message =
          form.querySelector(
            "#fw-register-message"
          );

        const name =
          form
            .querySelector(
              "#fw-worker-name"
            )
            .value
            .trim();

        const mobile =
          form
            .querySelector(
              "#fw-worker-mobile"
            )
            .value
            .trim();

        const service =
          form
            .querySelector(
              "#fw-worker-service"
            )
            .value
            .trim();

        const area =
          form
            .querySelector(
              "#fw-worker-area"
            )
            .value
            .trim();

        const experience =
          Number(
            form
              .querySelector(
                "#fw-worker-experience"
              )
              .value
          );

        const charge =
          form
            .querySelector(
              "#fw-worker-charge"
            )
            .value
            .trim();

        const availability =
          form
            .querySelector(
              "#fw-worker-availability"
            )
            .value
            .trim();

        const description =
          form
            .querySelector(
              "#fw-worker-description"
            )
            .value
            .trim();

        const proofFile =
          proofInput.files[0];

        message.className =
          "fw-register-message";

        message.textContent =
          "";

        if(
          !name ||
          !mobile ||
          !service ||
          !area ||
          !Number.isFinite(experience) ||
          experience < 0 ||
          !charge ||
          !availability
        ){

          message.textContent =
            "Please fill all required fields.";

          return;
        }

        if(
          experience >= 6 &&
          !proofFile
        ){

          message.textContent =
            "6 years or more experience ke liye Experience Proof mandatory hai.";

          proofSection.classList.add(
            "required"
          );

          return;
        }

        if(proofFile){

          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "application/pdf"
          ];

          if(
            !allowedTypes.includes(
              proofFile.type
            )
          ){

            message.textContent =
              "Proof sirf JPG, PNG ya PDF file hona chahiye.";

            return;
          }

          if(
            proofFile.size >
            10 * 1024 * 1024
          ){

            message.textContent =
              "Experience Proof maximum 10 MB ka ho sakta hai.";

            return;
          }

        }

        submitButton.disabled =
          true;

        submitButton.textContent =
          "Submitting...";

        try{

          let experienceProofPath =
            null;

          if(proofFile){

            const safeName =
              proofFile.name.replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
              );

            const uniqueName =
              `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2,10)}-${safeName}`;

            const storagePath =
              `worker-proofs/${uniqueName}`;

            const {
              error:
                uploadError
            } =
              await supabaseClient
                .storage
                .from(
                  "experience-proofs"
                )
                .upload(
                  storagePath,
                  proofFile,
                  {
                    cacheControl:
                      "3600",

                    upsert:
                      false,

                    contentType:
                      proofFile.type
                  }
                );

            if(uploadError){

              console.error(
                "Experience proof upload error:",
                uploadError
              );

              message.textContent =
                "Experience Proof upload nahi ho paaya. Please try again.";

              submitButton.disabled =
                false;

              submitButton.textContent =
                "Register Worker";

              return;
            }

            experienceProofPath =
              storagePath;

          }

          /*
            IMPORTANT:
            Registration uses the Supabase RPC
            created for pending workers.

            Actual DB column:
            starting_charge

            Photo is NOT collected here.
            Photo is added after profile creation.
          */

          const {
            data:
              newWorkerId,
            error
          } =
            await supabaseClient
              .rpc(
                "register_worker",
                {
                  p_name:
                    name,

                  p_mobile:
                    mobile,

                  p_service:
                    service,

                  p_area:
                    area,

                  p_experience:
                    String(experience),

                  p_starting_charge:
                    charge,

                  p_availability:
                    availability,

                  p_description:
                    description,

                  p_experience_proof:
                    experienceProofPath
                }
              );

          if(error){

            console.error(
              "Worker registration error:",
              error
            );

            message.textContent =
              error.message ||
              "Worker registration failed.";

            submitButton.disabled =
              false;

            submitButton.textContent =
              "Register Worker";

            return;
          }

          console.log(
            "Worker registered:",
            newWorkerId
          );

          form.reset();

          proofSection.classList.remove(
            "required"
          );

          openWorkerPhotoUpload(
            modal,
            {
              id:
                newWorkerId,

              name:
                name,

              mobile:
                mobile,

              service:
                service,

              area:
                area,

              experience:
                String(experience),

              starting_charge:
                charge,

              availability:
                availability,

              description:
                description,

              verification_status:
                "pending",

              photo_url:
                null,

              experience_proof:
                experienceProofPath
            }
          );

        }catch(error){

          console.error(
            "Worker registration failed:",
            error
          );

          message.textContent =
            "Something went wrong. Please try again.";

          submitButton.disabled =
            false;

          submitButton.textContent =
            "Register Worker";

        }

      }
    );

}

function setupWorkerRegistration(){

  let profileButton =
    document.querySelector(
      '[data-nav="profile"]'
    );

  if(!profileButton){

    profileButton =
      document.querySelector(
        '[data-page="profile"]'
      );

  }

  if(!profileButton){

    profileButton =
      document.getElementById(
        "bottom-profile"
      );

  }

  if(!profileButton){

    const bottomNav =
      document.querySelector(
        ".bottom-nav"
      );

    if(bottomNav){

      const candidates =
        bottomNav.querySelectorAll(
          "button, a, div"
        );

      profileButton =
        Array.from(
          candidates
        ).find(
          element =>
            element.textContent
              .trim()
              .toLowerCase()
              .includes(
                "profile"
              )
        );

    }

  }

  if(profileButton){

    profileButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openWorkerRegistration();

      }
    );

  }

}


/* =========================================================
   REGISTRATION + REQUEST CSS
========================================================= */

(function addFindWorkerExtraStyles(){

  if(
    document.getElementById(
      "findworker-extra-styles"
    )
  ){

    return;

  }

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "findworker-extra-styles";

  style.textContent = `

    .fw-request-modal,
    #fw-worker-registration{

      position:fixed;
      inset:0;
      z-index:99999;

    }

    .fw-request-modal{

      background:rgba(
        0,
        0,
        0,
        .55
      );

      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;

    }

    .fw-request-box{

      position:relative;
      width:100%;
      max-width:470px;
      max-height:90vh;
      overflow-y:auto;
      background:#fff;
      border-radius:22px;
      padding:24px;
      box-sizing:border-box;
      box-shadow:
        0 20px 60px rgba(
          0,
          0,
          0,
          .25
        );

    }

    .fw-request-close{

      position:absolute;
      right:14px;
      top:12px;
      width:36px;
      height:36px;
      border:0;
      border-radius:50%;
      background:#f1f3f5;
      font-size:24px;
      cursor:pointer;

    }

    .fw-request-box h2{
      margin:0 0 8px;
    }

    .fw-request-worker{
      color:#666;
      margin-bottom:18px;
    }

    .fw-request-form{

      display:flex;
      flex-direction:column;
      gap:8px;

    }

    .fw-request-form label{

      font-size:14px;
      font-weight:600;
      margin-top:6px;

    }

    .fw-request-form input,
    .fw-request-form textarea{

      width:100%;
      box-sizing:border-box;
      border:1px solid #d9dee5;
      border-radius:11px;
      padding:12px;
      font-size:14px;
      font-family:inherit;
      outline:none;

    }

    .fw-request-form textarea{

      min-height:90px;
      resize:vertical;

    }

    .fw-request-submit{

      border:0;
      border-radius:12px;
      padding:13px;
      background:#1769e0;
      color:#fff;
      font-weight:700;
      cursor:pointer;
      margin-top:8px;

    }

    .fw-request-submit:disabled{

      opacity:.6;
      cursor:not-allowed;

    }

    .fw-request-message{

      text-align:center;
      min-height:20px;
      font-size:14px;

    }

    .fw-request-message.success{

      color:#16833b;
      font-weight:600;

    }

    .fw-request-service-btn{

      width:100%;
      margin-top:16px;
      border:0;
      border-radius:12px;
      padding:13px;
      background:#1769e0;
      color:#fff;
      font-weight:700;
      cursor:pointer;

    }

    .fw-worker-register-overlay{

      position:absolute;
      inset:0;
      background:rgba(
        0,
        0,
        0,
        .58
      );

      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      box-sizing:border-box;

    }

    .fw-worker-register-box{

      position:relative;
      width:100%;
      max-width:520px;
      max-height:92vh;
      overflow-y:auto;
      background:#fff;
      border-radius:24px;
      padding:26px;
      box-sizing:border-box;
      box-shadow:
        0 25px 70px rgba(
          0,
          0,
          0,
          .28
        );

    }

    .fw-worker-register-close{

      position:absolute;
      right:14px;
      top:13px;
      width:38px;
      height:38px;
      border:0;
      border-radius:50%;
      background:#f1f3f5;
      font-size:25px;
      line-height:1;
      cursor:pointer;

    }

    .fw-register-header{

      text-align:center;
      padding:4px 35px 18px;

    }

    .fw-register-icon{

      width:60px;
      height:60px;
      border-radius:50%;
      margin:0 auto 10px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#eef5ff;
      font-size:30px;

    }

    .fw-register-header h2{

      margin:0;
      color:#172b4d;
      font-size:23px;

    }

    .fw-register-header p{

      margin:7px 0 0;
      color:#6b7280;
      font-size:14px;

    }

    #fw-worker-register-form{

      display:flex;
      flex-direction:column;
      gap:7px;

    }

    #fw-worker-register-form label{

      font-size:14px;
      font-weight:700;
      color:#263238;
      margin-top:7px;

    }

    #fw-worker-register-form input,
    #fw-worker-register-form select,
    #fw-worker-register-form textarea{

      width:100%;
      box-sizing:border-box;
      border:1px solid #d6dce4;
      border-radius:11px;
      background:#fff;
      padding:12px;
      font-size:14px;
      font-family:inherit;
      outline:none;

    }

    #fw-worker-register-form input:focus,
    #fw-worker-register-form select:focus,
    #fw-worker-register-form textarea:focus{

      border-color:#1769e0;
      box-shadow:
        0 0 0 3px rgba(
          23,
          105,
          224,
          .08
        );

    }

    #fw-worker-register-form textarea{

      resize:vertical;
      min-height:90px;

    }

    .fw-experience-note{

      background:#f5f8fc;
      color:#59636f;
      border-radius:10px;
      padding:10px 12px;
      font-size:12px;
      line-height:1.4;
      margin-top:2px;

    }

    .fw-proof-section{

      display:none;
      background:#fff8e8;
      border:1px solid #f0d48a;
      border-radius:12px;
      padding:12px;
      margin-top:4px;

    }

    .fw-proof-section.required{

      display:flex;
      flex-direction:column;
      gap:6px;

    }

    .fw-proof-section small{

      color:#765d17;
      line-height:1.4;

    }

    .fw-register-submit{

      width:100%;
      border:0;
      border-radius:13px;
      padding:14px;
      background:#1769e0;
      color:#fff;
      font-size:15px;
      font-weight:700;
      cursor:pointer;
      margin-top:13px;

    }

    .fw-register-submit:hover{

      filter:brightness(.96);

    }

    .fw-register-submit:disabled{

      opacity:.6;
      cursor:not-allowed;

    }

    .fw-register-message{

      min-height:20px;
      margin-top:5px;
      text-align:center;
      color:#c62828;
      font-size:13px;
      line-height:1.5;

    }

    .fw-register-message.success{

      color:#16833b;
      background:#eef9f1;
      border-radius:11px;
      padding:11px;

    }

    .fw-photo-upload-step{

      display:flex;
      flex-direction:column;
      gap:8px;

    }

    .fw-photo-preview{

      width:110px;
      height:110px;
      margin:0 auto 12px;
      border-radius:50%;
      background:#eef5ff;
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      font-size:45px;
      color:#1769e0;
      border:3px solid #e6edf8;

    }

    .fw-photo-preview img{

      width:100%;
      height:100%;
      object-fit:cover;
      display:block;

    }

    .fw-photo-upload-step label{

      font-size:14px;
      font-weight:700;
      color:#263238;

    }

    .fw-photo-upload-step input[type="file"]{

      width:100%;
      box-sizing:border-box;
      border:1px solid #d6dce4;
      border-radius:11px;
      background:#fff;
      padding:10px;
      font-size:14px;

    }

    .fw-photo-upload-step small{

      color:#6b7280;
      font-size:12px;
      line-height:1.4;

    }

    .fw-skip-photo-btn{

      width:100%;
      border:1px solid #d6dce4;
      border-radius:13px;
      padding:13px;
      background:#fff;
      color:#4b5563;
      font-size:14px;
      font-weight:700;
      cursor:pointer;
      margin-top:4px;

    }

    .fw-skip-photo-btn:hover{

      background:#f7f9fc;

    }

    @media(max-width:520px){

      .fw-worker-register-overlay{

        padding:10px;

      }

      .fw-worker-register-box{

        max-height:95vh;
        padding:20px 16px;
        border-radius:19px;

      }

      .fw-register-header{

        padding-left:25px;
        padding-right:25px;

      }

    }

  `;

  document.head.appendChild(
    style
  );

})();


/* =========================================================
   INITIAL LOAD
========================================================= */

loadWorkers();
setupWorkerRegistration();
