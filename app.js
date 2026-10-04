/* =========================================================
   FINDWORKER
   APP VERSION 5 + WORKER REGISTRATION
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
  "https://jprqqylhmwenshynrgtk.supabase.co"; 
 
/* 
  IMPORTANT: 
  Yahan apni existing Publishable Key rakho. 
  Apni key mujhe send mat karna. 
*/ 
 
const SUPABASE_KEY = 
  "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i"; 
 
const supabaseClient = 
  supabase.createClient( 
    SUPABASE_URL, 
    SUPABASE_KEY 
  ); 
 
 
/* ========================================================= 
   ALL SERVICES 
========================================================= */ 
 
const ALL_SERVICES = [ 
 
  "AC Installation", 
  "AC Repair", 
  "AC Gas Filling", 
  "AC Service", 
  "AC Technician", 
 
  "Aluminium Worker", 
  "Appliance Repair", 
  "Auto Mechanic", 
 
  "Bathroom Cleaning", 
  "Beautician", 
  "Bike Mechanic", 
  "Bike Wash", 
 
  "Car Cleaning", 
  "Car Mechanic", 
  "Car Wash", 
  "Carpenter", 
  "CCTV Installation", 
  "CCTV Repair", 
  "Chimney Repair", 
  "Cleaner", 
  "Computer Repair", 
  "Computer Technician", 
  "Construction Worker", 
  "Cook", 
 
  "Dance Teacher", 
  "DTH Technician", 
 
  "Electrician", 
  "Electrician Helper", 
  "Event Decoration", 
 
  "Fabrication Worker", 
  "False Ceiling Worker", 
  "Fitness Trainer", 
  "Furniture Repair", 
 
  "Gardener", 
  "Gardening Service", 
  "Glass Worker", 
  "Geyser Repair", 
 
  "Home Cleaning", 
  "Home Tutor", 
 
  "Interior Designer", 
  "Internet Technician", 
  "Inverter Repair", 
  "Ironing Service", 
 
  "Kitchen Cleaning", 
 
  "Labour", 
  "Laptop Repair", 
  "Laundry Service", 
 
  "Makeup Artist", 
  "Mason", 
  "Mechanic", 
  "Mehndi Artist", 
  "Microwave Repair", 
  "Mobile Repair", 
  "Mobile Technician", 
 
  "Other Service", 
 
  "Packers & Movers", 
  "Painter", 
  "Pest Control", 
  "Photographer", 
  "Plumber", 
  "POP Worker", 
  "Printer Repair", 
  "Printer Technician", 
 
  "Refrigerator Repair", 
  "RO Installation", 
  "RO Repair", 
  "RO Technician", 
 
  "Salon at Home", 
  "Security Guard", 
  "Sofa Cleaning", 
  "Solar Technician", 
 
  "Tailor", 
  "Tile Worker", 
  "TV Repair", 
 
  "Washing Machine Repair", 
  "Water Purifier Repair", 
  "Water Tank Cleaning", 
  "Welder", 
  "Welder Fabricator", 
  "WiFi Technician", 
 
  "Yoga Trainer" 
 
]; 
 
 
/* ========================================================= 
   DOM 
========================================================= */ 
 
const searchInput = 
  document.getElementById( 
    "service-search" 
  ); 
 
const suggestionBox = 
  document.getElementById( 
    "service-suggestions" 
  ); 
 
const clearButton = 
  document.getElementById( 
    "search-clear" 
  ); 
 
const workerList = 
  document.getElementById( 
    "worker-list" 
  ); 
 
const categories = 
  document.querySelectorAll( 
    ".category" 
  ); 
 
const bottomSearch = 
  document.getElementById( 
    "bottom-search" 
  ); 
 
 
/* ========================================================= 
   SERVICE ICON 
========================================================= */ 
 
function getServiceIcon(service){ 
 
  const name = 
    String(service || "") 
      .toLowerCase(); 
 
  if( 
    name.includes("electric") 
  ){ 
    return "⚡"; 
  } 
 
  if( 
    name.includes("plumb") 
  ){ 
    return "🚰"; 
  } 
 
  if( 
    name.includes("ac ") 
    || 
    name.startsWith("ac") 
  ){ 
    return "❄️"; 
  } 
 
  if( 
    name.includes("carpent") 
  ){ 
    return "🪚"; 
  } 
 
  if( 
    name.includes("paint") 
  ){ 
    return "🎨"; 
  } 
 
  if( 
    name.includes("clean") 
  ){ 
    return "🧹"; 
  } 
 
  if( 
    name.includes("mobile") 
  ){ 
    return "📱"; 
  } 
 
  if( 
    name.includes("computer") 
    || 
    name.includes("laptop") 
  ){ 
    return "💻"; 
  } 
 
  if( 
    name.includes("mechanic") 
    || 
    name.includes("bike") 
    || 
    name.includes("car ") 
    || 
    name === "car" 
  ){ 
    return "🔧"; 
  } 
 
  if( 
    name.includes("cook") 
  ){ 
    return "👨‍🍳"; 
  } 
 
  if( 
    name.includes("driver") 
  ){ 
    return "🚗"; 
  } 
 
  if( 
    name.includes("cctv") 
  ){ 
    return "📹"; 
  } 
 
  if( 
    name.includes("tailor") 
  ){ 
    return "🧵"; 
  } 
 
  if( 
    name.includes("gard") 
  ){ 
    return "🌱"; 
  } 
 
  if( 
    name.includes("teacher") 
  ){ 
    return "📚"; 
  } 
 
  if( 
    name.includes("repair") 
  ){ 
    return "🛠️"; 
  } 
 
  if( 
    name.includes("solar") 
  ){ 
    return "☀️"; 
  } 
 
  if( 
    name.includes("yoga") 
  ){ 
    return "🧘"; 
  } 
 
  if( 
    name.includes("photographer") 
  ){ 
    return "📷"; 
  } 
 
  return "👤"; 
} 
 
 
/* ========================================================= 
   ESCAPE HTML 
========================================================= */ 
 
function escapeHTML(value){ 
 
  return String( 
    value ?? "" 
  ) 
 
  .replace( 
    /&/g, 
    "&amp;" 
  ) 
 
  .replace( 
    /</g, 
    "&lt;" 
  ) 
 
  .replace( 
    />/g, 
    "&gt;" 
  ) 
 
  .replace( 
    /"/g, 
    "&quot;" 
  ) 
 
  .replace( 
    /'/g, 
    "&#039;" 
  ); 
 
} 
 
 
/* ========================================================= 
   WORKER PHOTO 
   DATABASE COLUMN = photo_url
========================================================= */ 
 
function getWorkerPhoto(worker){ 
 
  const photo = 
    String( 
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
 
 
/* ========================================================= 
   SEARCH - SERVICE SUGGESTIONS 
========================================================= */ 
 
function showServiceSuggestions(){ 
 
  const raw = 
    searchInput.value.trim(); 
 
  const query = 
    raw.toLowerCase(); 
 
  suggestionBox.innerHTML = ""; 
 
  if(!query){ 
 
    suggestionBox.classList.remove( 
      "show" 
    ); 
 
    clearButton.classList.remove( 
      "show" 
    ); 
 
    return; 
  } 
 
  clearButton.classList.add( 
    "show" 
  ); 
 
  const matches = 
    ALL_SERVICES.filter( 
      service => 
        service 
          .toLowerCase() 
          .startsWith(query) 
    ); 
 
  if(matches.length === 0){ 
 
    suggestionBox.innerHTML = ` 
 
      <div class="no-service"> 
 
        No service found for 
        "<strong>${escapeHTML(raw)}</strong>" 
 
      </div> 
 
    `; 
 
    suggestionBox.classList.add( 
      "show" 
    ); 
 
    return; 
  } 
 
  matches.forEach( 
    service => { 
 
      const item = 
        document.createElement( 
          "button" 
        ); 
 
      item.type = 
        "button"; 
 
      item.className = 
        "service-suggestion"; 
 
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
 
      item.addEventListener( 
        "click", 
        () => { 
 
          searchInput.value = 
            service; 
 
          suggestionBox.classList.remove( 
            "show" 
          ); 
 
          clearButton.classList.add( 
            "show" 
          ); 
 
          loadWorkers(service); 
 
        } 
      ); 
 
      suggestionBox.appendChild( 
        item 
      ); 
 
    } 
  ); 
 
  suggestionBox.classList.add( 
    "show" 
  ); 
} 
 
 
/* ========================================================= 
   LOAD WORKERS 
========================================================= */ 
 
async function loadWorkers( 
  serviceFilter = "" 
){ 
 
  workerList.innerHTML = ` 
 
    <div class="loading-card"> 
 
      <div class="loading-spinner"></div> 
 
      <div> 
 
        <strong> 
          Finding workers... 
        </strong> 
 
        <small> 
          Loading verified professionals 
        </small> 
 
      </div> 
 
    </div> 
 
  `; 
 
  try{ 
 
    let query = 
      supabaseClient 
        .from("workers") 
        .select("*") 
        .eq( 
          "verification_status", 
          "approved" 
        ); 
 
    if(serviceFilter){ 
 
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
 
    if(error){ 
 
      console.error( 
        "Supabase worker error:", 
        error 
      ); 
 
      showWorkerError(); 
 
      return; 
 
    } 
 
    workerList.innerHTML = ""; 
 
    if( 
      !data || 
      data.length === 0 
    ){ 
 
      showNoWorkers( 
        serviceFilter 
      ); 
 
      return; 
 
    } 
 
    data.forEach( 
      worker => { 
 
        createWorkerCard( 
          worker 
        ); 
 
      } 
    ); 
 
  } 
  catch(error){ 
 
    console.error( 
      "Worker loading failed:", 
      error 
    ); 
 
    showWorkerError(); 
 
  } 
} 
 
 
/* ========================================================= 
   CREATE WORKER CARD 
========================================================= */ 
 
function createWorkerCard( 
  worker 
){ 
 
  const card = 
    document.createElement( 
      "div" 
    ); 
 
  card.className = 
    "worker"; 
 
  card.innerHTML = ` 
 
    <div class="worker-img"> 
 
      ${getWorkerPhoto(worker)} 
 
    </div> 
 
    <div class="worker-info"> 
 
      <h3> 
        ${escapeHTML( 
          worker.service 
        )} 
      </h3> 
 
      <p> 
        ${escapeHTML( 
          worker.name 
        )} 
        • 
        ${escapeHTML( 
          worker.area 
        )} 
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
 
  workerList.appendChild( 
    card 
  ); 
 
  const viewButton = 
    card.querySelector( 
      ".view" 
    ); 
 
  viewButton.addEventListener( 
    "click", 
    () => { 
 
      showWorkerProfile( 
        worker 
      ); 
 
    } 
  ); 
} 
 
 
/* ========================================================= 
   NO WORKERS 
========================================================= */ 
 
function showNoWorkers( 
  service 
){ 
 
  const serviceText = 
    service 
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
 
 
/* ========================================================= 
   ERROR 
========================================================= */ 
 
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
 
 
/* ========================================================= 
   WORKER PROFILE 
========================================================= */ 
 
function showWorkerProfile( 
  worker 
){ 
 
  const old = 
    document.querySelector( 
      ".worker-profile" 
    ); 
 
  if(old){ 
    old.remove(); 
  } 
 
  const profile = 
    document.createElement( 
      "div" 
    ); 
 
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
        ${escapeHTML( 
          worker.name 
        )} 
      </h2> 
 
      <div class="verified"> 
        ✓ Verified Provider 
      </div> 
 
      <div class="profile-details"> 
 
        <p> 
 
          🔧 
 
          <strong> 
            Service: 
          </strong> 
 
          ${escapeHTML( 
            worker.service 
          )} 
 
        </p> 
 
        <p> 
 
          📍 
 
          <strong> 
            Area: 
          </strong> 
 
          ${escapeHTML( 
            worker.area 
          )} 
 
        </p> 
 
        <p> 
 
          🛠️ 
 
          <strong> 
            Experience: 
          </strong> 
 
          ${escapeHTML( 
            worker.experience 
          )} 
 
        </p> 
 
        <p> 
 
          💰 
 
          <strong> 
            Starting charge: 
          </strong> 
 
          ₹${escapeHTML( 
            String( 
              worker["starting charge"] ?? 
              worker.starting_charge ?? 
              "" 
            ) 
          )} 
 
        </p> 
 
        <p> 
 
          🕐 
 
          <strong> 
            Availability: 
          </strong> 
 
          ${escapeHTML( 
            worker.availability 
          )} 
 
        </p> 
 
        <p> 
 
          📝 
 
          <strong> 
            About: 
          </strong> 
 
          ${escapeHTML( 
            worker.description 
          )} 
 
        </p> 
 
      </div> 
 
      <div class="contact-buttons"> 
 
        <a 
          class="call-button" 
          href="tel:${escapeHTML( 
            worker.mobile 
          )}" 
        > 
          📞 Call 
        </a> 
 
        <a 
          class="whatsapp-button" 
          href="https://wa.me/91${escapeHTML(
            worker.mobile
          )}"
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

  document.body.appendChild(
    profile
  );

  profile
    .querySelector(
      ".close-profile"
    )
    .addEventListener(
      "click",
      () => {

        profile.remove();

      }
    );

  profile
    .querySelector(
      ".fw-request-service-btn"
    )
    .addEventListener(
      "click",
      () => {

        profile.remove();

        openRequestServiceForm(
          worker
        );

      }
    );

  profile.addEventListener(
    "click",
    event => {

      if(
        event.target === profile
      ){

        profile.remove();

      }

    }
  );
}


/* =========================================================
   CUSTOMER REQUEST SERVICE
   EXISTING SUPABASE service_requests TABLE
========================================================= */

function openRequestServiceForm(
  worker
){

  const old =
    document.querySelector(
      ".fw-request-modal"
    );

  if(old){
    old.remove();
  }

  const modal =
    document.createElement(
      "div"
    );

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

  document.body.appendChild(
    modal
  );

  modal
    .querySelector(
      ".fw-request-close"
    )
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal.addEventListener(
    "click",
    event => {

      if(
        event.target === modal
      ){

        modal.remove();

      }

    }
  );

  const form =
    modal.querySelector(
      ".fw-request-form"
    );

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const button =
        form.querySelector(
          ".fw-request-submit"
        );

      const message =
        form.querySelector(
          ".fw-request-message"
        );

      const customerName =
        form.querySelector(
          ".fw-customer-name"
        ).value.trim();

      const customerMobile =
        form.querySelector(
          ".fw-customer-mobile"
        ).value.trim();

      const customerArea =
        form.querySelector(
          ".fw-customer-area"
        ).value.trim();

      const requestDetails =
        form.querySelector(
          ".fw-request-details"
        ).value.trim();

      button.disabled = true;
      button.textContent =
        "Sending...";

      try{

        const { error } =
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


        try{

          const existingRequests =
            JSON.parse(
              localStorage.getItem(
                "findworker_customer_requests"
              ) ||
              "[]"
            );

          existingRequests.unshift({
            worker_id: worker.id,
            worker_name: worker.name,
            service: worker.service,
            customer_name: customerName,
            customer_mobile: customerMobile,
            area: customerArea,
            request_details: requestDetails,
            status: "pending",
            created_at: new Date().toISOString()
          });

          localStorage.setItem(
            "findworker_customer_requests",
            JSON.stringify(
              existingRequests.slice(0, 30)
            )
          );

        }
        catch(localStorageError){

          console.warn(
            "Could not save local request history:",
            localStorageError
          );

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

      }
      catch(error){

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


/* =========================================================
   SEARCH INPUT
========================================================= */

searchInput.addEventListener(
  "input",
  () => {

    showServiceSuggestions();

  }
);


/* =========================================================
   CLEAR SEARCH
========================================================= */

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


/* =========================================================
   POPULAR CATEGORY CLICK
========================================================= */

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

        suggestionBox.innerHTML = "";

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


/* =========================================================
   BOTTOM SEARCH BUTTON
========================================================= */

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


/* =========================================================
   CLOSE DROPDOWN OUTSIDE
========================================================= */

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


/* =========================================================
   ESC KEY
========================================================= */

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

      <div class="fw-photo-preview" id="fw-photo-preview">
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
          file.name
            .replace(
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
/* =========================================================
   FINAL WORKER LOADER FIX
   Uses existing security-definer RPC
========================================================= */

loadWorkers = async function(serviceFilter = ""){

  if(!workerList){
    return;
  }

  workerList.innerHTML = `

    <div class="loading-card">

      <div class="loading-spinner"></div>

      <div>

        <strong>
          Finding workers...
        </strong>

        <small>
          Loading verified professionals
        </small>

      </div>

    </div>

  `;

  try{

    const rpcPromise =
      supabaseClient.rpc(
        "get_approved_workers"
      );

    const timeoutPromise =
      new Promise(resolve => {

        setTimeout(
          () => {

            resolve({

              data: null,

              error: new Error(
                "Worker loading timed out."
              )

            });

          },
          12000
        );

      });

    const result =
      await Promise.race([
        rpcPromise,
        timeoutPromise
      ]);

    const data =
      result.data;

    const error =
      result.error;

    if(error){

      console.error(
        "Worker loading error:",
        error
      );

      workerList.innerHTML = `

        <div class="no-workers">

          <div class="empty-icon">
            ⚠️
          </div>

          <h3>
            Unable to load workers
          </h3>

          <p>
            ${escapeHTML(
              error.message ||
              "Please refresh the page and try again."
            )}
          </p>

        </div>

      `;

      return;

    }

    let workers =
      Array.isArray(data)
        ? data
        : [];

    if(serviceFilter){

      const filter =
        String(serviceFilter)
          .toLowerCase()
          .trim();

      workers =
        workers.filter(
          worker =>
            String(
              worker.service || ""
            )
            .toLowerCase()
            .includes(filter)
        );

    }

    workerList.innerHTML = "";

    if(workers.length === 0){

      showNoWorkers(
        serviceFilter
      );

      return;

    }

    workers.forEach(
      worker => {

        createWorkerCard(
          worker
        );

      }
    );

  }
  catch(error){

    console.error(
      "Final worker loader error:",
      error
    );

    workerList.innerHTML = `

      <div class="no-workers">

        <div class="empty-icon">
          ⚠️
        </div>

        <h3>
          Unable to load workers
        </h3>

        <p>
          ${escapeHTML(
            error.message ||
            "Please refresh the page and try again."
          )}
        </p>

      </div>

    `;

  }

};


/* Run the fixed loader immediately */
loadWorkers();
