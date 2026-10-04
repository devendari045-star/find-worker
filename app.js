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


        /* Save a local copy so the customer Requests screen
           can show requests without exposing all service_requests
           rows through a public SELECT policy. */
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
  data: photoSaveResult,
  error: photoSaveError
} =
  await supabaseClient
    .rpc(
      "save_worker_photo",
      {
        p_worker_id:
          worker.id,

        p_mobile:
          worker.mobile,

        p_photo_url:
          publicPhotoURL
      }
    );

if(
  photoSaveError ||
  photoSaveResult !== true
){

  console.error(
    "Worker photo database update error:",
    photoSaveError ||
    "Worker photo was not saved."
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
        if(
  photoSaveError ||
  photoSaveResult !== true
){

  console.error(
    "Worker photo database update error:",
    photoSaveError ||
    "Worker photo was not saved."
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

      }
      catch(error){

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
   ADDED WITHOUT CHANGING EXISTING CUSTOMER APP
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

          <button
            type="button"
            id="fw-switch-from-worker"
            class="fw-switch-profile-btn"
          >
            Switch Profile
          </button>

        </form>

      </div>

    </div>

  `;

  document.body.appendChild(
    modal
  );


  const closeButton =
    modal.querySelector(
      ".fw-worker-register-close"
    );


  closeButton.addEventListener(
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

    if(
      Number.isFinite(years) &&
      years >= 6
    ){

      proofSection.classList.add(
        "required"
      );

      proofInput.required = true;

    }
    else{

      proofSection.classList.remove(
        "required"
      );

      proofInput.required = false;

    }

  }


  experienceInput.addEventListener(
    "input",
    updateProofRequirement
  );


  const form =
    modal.querySelector(
      "#fw-worker-register-form"
    );


  modal
    .querySelector(
      "#fw-switch-from-worker"
    )
    .addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "findworker_user_role"
        );

        modal.remove();

        showFindWorkerRoleSelection(true);

      }
    );


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const submitButton =
        modal.querySelector(
          "#fw-register-submit"
        );

      const message =
        modal.querySelector(
          "#fw-register-message"
        );


      const name =
        modal
          .querySelector(
            "#fw-worker-name"
          )
          .value
          .trim();


      const mobile =
        modal
          .querySelector(
            "#fw-worker-mobile"
          )
          .value
          .trim();


      const service =
        modal
          .querySelector(
            "#fw-worker-service"
          )
          .value
          .trim();


      const area =
        modal
          .querySelector(
            "#fw-worker-area"
          )
          .value
          .trim();


      const experience =
        Number(
          modal
            .querySelector(
              "#fw-worker-experience"
            )
            .value
        );


      const charge =
        modal
          .querySelector(
            "#fw-worker-charge"
          )
          .value
          .trim();


      const availability =
        modal
          .querySelector(
            "#fw-worker-availability"
          )
          .value
          .trim();


      const description =
        modal
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


      /*
        6 YEARS OR MORE
        = EXPERIENCE PROOF REQUIRED
      */

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


      /*
        EXPERIENCE PROOF FILE VALIDATION
      */

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


        /*
          Maximum 10 MB
        */

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


        /*
          Upload proof first.
          Existing bucket:
          experience-proofs

          Existing policy:
          Allow worker proof upload
        */

        if(proofFile){

          const safeName =
            proofFile.name
              .replace(
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


          /*
            Save storage path in workers.experience_proof
          */

          experienceProofPath =
            storagePath;

        }


        /*
          CREATE WORKER
          Initially PENDING

          IMPORTANT:
          Photo is NOT collected during registration.
          Profile photo will be added after registration.
        */

        const {
          data: newWorkerId,
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

        localStorage.setItem(
          "findworker_worker_mobile",
          mobile
        );

        localStorage.setItem(
          "findworker_user_role",
          "worker"
        );

        document.body.dataset.findworkerRole =
          "worker";


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


      }
      catch(error){

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


/* =========================================================
   CUSTOMER REQUESTS SCREEN
========================================================= */

function openCustomerRequests(){

  const old =
    document.querySelector(
      ".fw-customer-requests-modal"
    );

  if(old){
    old.remove();
  }

  let requests = [];

  try{

    requests = JSON.parse(
      localStorage.getItem(
        "findworker_customer_requests"
      ) ||
      "[]"
    );

  }
  catch(error){

    console.warn(
      "Could not read request history:",
      error
    );

  }

  const modal =
    document.createElement(
      "div"
    );

  modal.className =
    "fw-customer-requests-modal";

  modal.innerHTML = `

    <div class="fw-customer-requests-box">

      <button
        type="button"
        class="fw-customer-requests-close"
        aria-label="Close"
      >
        ×
      </button>

      <div class="fw-customer-requests-header">

        <div class="fw-customer-requests-icon">
          📋
        </div>

        <div>
          <h2>My Requests</h2>
          <p>Service requests you have sent.</p>
        </div>

      </div>

      <div class="fw-customer-requests-list">

        ${
          requests.length
            ? requests.map(
                request => `
                  <div class="fw-customer-request-card">

                    <div class="fw-customer-request-top">
                      <strong>
                        ${escapeHTML(request.service)}
                      </strong>
                      <span class="fw-request-status">
                        ${escapeHTML(request.status || "pending")}
                      </span>
                    </div>

                    <div class="fw-customer-request-worker">
                      Worker: ${escapeHTML(request.worker_name)}
                    </div>

                    <div class="fw-customer-request-meta">
                      📍 ${escapeHTML(request.area)}
                    </div>

                    ${
                      request.request_details
                        ? `<div class="fw-customer-request-details">
                            ${escapeHTML(request.request_details)}
                           </div>`
                        : ""
                    }

                    <div class="fw-customer-request-date">
                      ${new Date(
                        request.created_at
                      ).toLocaleString()}
                    </div>

                  </div>
                `
              ).join("")
            : `
                <div class="fw-customer-no-requests">
                  <div class="fw-customer-no-requests-icon">📭</div>
                  <h3>No requests yet</h3>
                  <p>Your service requests will appear here.</p>
                </div>
              `
        }

      </div>

    </div>

  `;

  document.body.appendChild(
    modal
  );

  modal
    .querySelector(
      ".fw-customer-requests-close"
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
}


function setupCustomerRequestsButton(){

  const requestButtons = [
    document.getElementById("bottom-requests"),
    document.querySelector('[data-nav="requests"]')
  ].filter(Boolean);

  requestButtons.forEach(
    button => {

      if(
        button.dataset.findworkerRequestsReady === "1"
      ){
        return;
      }

      button.dataset.findworkerRequestsReady = "1";

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          openCustomerRequests();

        }
      );

    }
  );
}


/* =========================================================
   WORKER REGISTRATION BUTTON
   Uses existing Profile item if available.
   Existing customer navigation is otherwise untouched.
========================================================= */



/* =========================================================
   CUSTOMER PROFILE
   Separate from Worker Profile
========================================================= */

function openCustomerProfile(){

  const old =
    document.getElementById(
      "fw-customer-profile"
    );

  if(old){
    old.remove();
  }

  const modal =
    document.createElement("div");

  modal.id =
    "fw-customer-profile";

  modal.innerHTML = `

    <div class="fw-customer-profile-overlay">

      <div class="fw-customer-profile-box">

        <button
          type="button"
          class="fw-customer-profile-close"
          aria-label="Close"
        >
          ×
        </button>

        <div class="fw-customer-profile-header">

          <div class="fw-customer-profile-icon">
            🏠
          </div>

          <h2>
            Customer Profile
          </h2>

          <p>
         
          </p>

        </div>

        <form id="fw-customer-profile-form">

          <label>
            Full Name *
          </label>

          <input
            type="text"
            id="fw-customer-name"
            required
            placeholder="Enter your name"
          >

          <label>
            Mobile Number *
          </label>

          <input
            type="tel"
            id="fw-customer-mobile"
            required
            inputmode="numeric"
            placeholder="Enter mobile number"
          >

          <label>
            Area
          </label>

          <input
            type="text"
            id="fw-customer-area"
            placeholder="Enter your area"
          >

          <label>
            Profile Photo
          </label>

          <input
            type="file"
            id="fw-customer-photo"
            accept=".jpg,.jpeg,.png,.webp"
          >

          <small class="fw-customer-profile-note">
            JPG, PNG ya WEBP. Maximum 5 MB.
          </small>

          <div
            id="fw-customer-profile-preview"
            class="fw-customer-profile-preview"
          >
            👤
          </div>

          <div
            id="fw-customer-profile-message"
            class="fw-customer-profile-message"
          ></div>

          <button
            type="submit"
            class="fw-customer-profile-save"
          >
            Save Customer Profile
          </button>

          <button
            type="button"
            class="fw-switch-profile-btn"
            id="fw-switch-from-customer"
          >
            Switch Profile
          </button>

        </form>

      </div>

    </div>

  `;

  document.body.appendChild(modal);

  const closeButton =
    modal.querySelector(
      ".fw-customer-profile-close"
    );

  const form =
    modal.querySelector(
      "#fw-customer-profile-form"
    );

  const nameInput =
    modal.querySelector(
      "#fw-customer-name"
    );

  const mobileInput =
    modal.querySelector(
      "#fw-customer-mobile"
    );

  const areaInput =
    modal.querySelector(
      "#fw-customer-area"
    );

  const photoInput =
    modal.querySelector(
      "#fw-customer-photo"
    );

  const preview =
    modal.querySelector(
      "#fw-customer-profile-preview"
    );

  const message =
    modal.querySelector(
      "#fw-customer-profile-message"
    );

  const savedMobile =
    localStorage.getItem(
      "findworker_customer_mobile"
    ) || "";

  mobileInput.value =
    savedMobile;

  closeButton.addEventListener(
    "click",
    () => modal.remove()
  );

  modal
    .querySelector(
      ".fw-customer-profile-overlay"
    )
    .addEventListener(
      "click",
      event => {

        if(
          event.target.classList.contains(
            "fw-customer-profile-overlay"
          )
        ){

          modal.remove();

        }

      }
    );

  function showCustomerPhoto(url){

    if(!url){

      preview.innerHTML = "👤";
      return;

    }

    preview.innerHTML = `

      <img
        src="${escapeHTML(url)}"
        alt="Customer profile photo"
      >

    `;

  }

  async function loadExistingCustomer(){

    const mobile =
      mobileInput.value.trim();

    if(!mobile){
      return;
    }

    try{

      const {
        data,
        error
      } =
        await supabaseClient
          .from("customer_profiles")
          .select("*")
          .eq(
            "mobile",
            mobile
          )
          .maybeSingle();

      if(error){

        console.warn(
          "Customer profile read error:",
          error
        );

        return;

      }

      if(!data){
        return;
      }

      nameInput.value =
        data.name || "";

      areaInput.value =
        data.area || "";

      showCustomerPhoto(
        data.photo_url || ""
      );

    }
    catch(error){

      console.warn(
        "Customer profile load failed:",
        error
      );

    }

  }

  loadExistingCustomer();

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
              alt="Customer profile preview"
            >

          `;

        };

      reader.readAsDataURL(
        file
      );

      message.textContent = "";

    }
  );

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const saveButton =
        form.querySelector(
          ".fw-customer-profile-save"
        );

      const name =
        nameInput.value.trim();

      const mobile =
        mobileInput.value.trim();

      const area =
        areaInput.value.trim();

      const photoFile =
        photoInput.files[0];

      if(
        !name ||
        !mobile
      ){

        message.textContent =
          "Name aur mobile number required hai.";

        return;

      }

      if(photoFile){

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp"
        ];

        if(
          !allowedTypes.includes(
            photoFile.type
          )
        ){

          message.textContent =
            "Photo sirf JPG, PNG ya WEBP honi chahiye.";

          return;

        }

        if(
          photoFile.size >
          5 * 1024 * 1024
        ){

          message.textContent =
            "Profile photo maximum 5 MB ki ho sakti hai.";

          return;

        }

      }

      saveButton.disabled =
        true;

      saveButton.textContent =
        "Saving...";

      message.textContent =
        "";

      try{

        let photoURL =
          null;

        const {
          data: existing,
          error: existingError
        } =
          await supabaseClient
            .from("customer_profiles")
            .select("photo_url")
            .eq(
              "mobile",
              mobile
            )
            .maybeSingle();

        if(existingError){
          throw existingError;
        }

        photoURL =
          existing?.photo_url ||
          null;

        if(photoFile){

          const safeName =
            photoFile.name
              .replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
              );

          const storagePath =
            `customer-profile/${Date.now()}-${Math.random()
              .toString(36)
              .substring(2,10)}-${safeName}`;

          const {
            error: uploadError
          } =
            await supabaseClient
              .storage
              .from("worker-photos")
              .upload(
                storagePath,
                photoFile,
                {
                  cacheControl:
                    "3600",
                  upsert:
                    false,
                  contentType:
                    photoFile.type
                }
              );

          if(uploadError){

            throw uploadError;

          }

          const {
            data: publicData
          } =
            supabaseClient
              .storage
              .from("worker-photos")
              .getPublicUrl(
                storagePath
              );

          photoURL =
            publicData?.publicUrl ||
            photoURL;

        }

        const {
          error: saveError
        } =
          await supabaseClient
            .from("customer_profiles")
            .upsert(
              {
                name,
                mobile,
                area,
                photo_url:
                  photoURL
              },
              {
                onConflict:
                  "mobile"
              }
            );

        if(saveError){
          throw saveError;
        }

        localStorage.setItem(
          "findworker_customer_mobile",
          mobile
        );

        localStorage.setItem(
          "findworker_user_role",
          "customer"
        );

        document.body.dataset.findworkerRole =
          "customer";

        message.className =
          "fw-customer-profile-message success";

        message.textContent =
          "Customer Profile saved successfully!";

        saveButton.textContent =
          "Profile Saved";

        setTimeout(
          () => modal.remove(),
          1000
        );

      }
      catch(error){

        console.error(
          "Customer profile failed:",
          error
        );

        message.textContent =
          error.message ||
          "Customer profile save nahi ho paayi.";

        saveButton.disabled =
          false;

        saveButton.textContent =
          "Save Customer Profile";

      }

    }
  );

  modal
    .querySelector(
      "#fw-switch-from-customer"
    )
    .addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "findworker_user_role"
        );

        modal.remove();

        showFindWorkerRoleSelection(true);

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
              .includes("profile")
        );

    }

  }


  if(profileButton){

    profileButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        const role =
          localStorage.getItem(
            "findworker_user_role"
          );

        if(role === "worker"){

          openWorkerRegistration();
          return;

        }

        if(role === "customer"){

          openCustomerProfile();
          return;

        }

        showFindWorkerRoleSelection(true);

      }
    );

  }

}


/* =========================================================
   REGISTRATION + REQUEST CSS
   Added dynamically.
   Existing style.css remains untouched.
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

    /* ================================================
       REQUEST SERVICE
    ================================================ */

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


    /* ================================================
       CUSTOMER REQUESTS
    ================================================ */

    .fw-customer-requests-modal{

      position:fixed;
      inset:0;
      z-index:99998;
      background:rgba(0,0,0,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      box-sizing:border-box;

    }

    .fw-customer-requests-box{

      position:relative;
      width:100%;
      max-width:560px;
      max-height:90vh;
      overflow-y:auto;
      background:#fff;
      border-radius:22px;
      padding:24px;
      box-sizing:border-box;
      box-shadow:0 20px 60px rgba(0,0,0,.25);

    }

    .fw-customer-requests-close{

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

    .fw-customer-requests-header{

      display:flex;
      align-items:center;
      gap:12px;
      padding-right:42px;
      margin-bottom:18px;

    }

    .fw-customer-requests-icon{

      width:48px;
      height:48px;
      border-radius:14px;
      background:#eef5ff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:25px;
      flex:none;

    }

    .fw-customer-requests-header h2{

      margin:0;
      color:#172b4d;

    }

    .fw-customer-requests-header p{

      margin:4px 0 0;
      color:#6b7280;
      font-size:13px;

    }

    .fw-customer-requests-list{

      display:flex;
      flex-direction:column;
      gap:12px;

    }

    .fw-customer-request-card{

      border:1px solid #e3e8ef;
      border-radius:15px;
      padding:14px;
      background:#fff;

    }

    .fw-customer-request-top{

      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;

    }

    .fw-customer-request-top strong{

      color:#172b4d;
      font-size:15px;

    }

    .fw-request-status{

      display:inline-flex;
      align-items:center;
      padding:5px 9px;
      border-radius:999px;
      background:#fff4db;
      color:#8a6414;
      font-size:11px;
      font-weight:700;
      text-transform:capitalize;

    }

    .fw-customer-request-worker,
    .fw-customer-request-meta,
    .fw-customer-request-details,
    .fw-customer-request-date{

      margin-top:7px;
      color:#59636f;
      font-size:13px;
      line-height:1.45;

    }

    .fw-customer-request-details{

      padding:9px 10px;
      background:#f7f9fc;
      border-radius:10px;

    }

    .fw-customer-request-date{

      font-size:11px;
      color:#8a919a;

    }

    .fw-customer-no-requests{

      text-align:center;
      padding:36px 15px;
      color:#69727d;

    }

    .fw-customer-no-requests-icon{

      font-size:40px;
      margin-bottom:8px;

    }

    .fw-customer-no-requests h3{

      margin:0 0 6px;
      color:#172b4d;

    }

    .fw-customer-no-requests p{

      margin:0;
      font-size:13px;

    }

    /* ================================================
       WORKER REGISTRATION
    ================================================ */

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


    /* ================================================
       PROFILE PHOTO AFTER REGISTRATION
    ================================================ */

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
   CUSTOMER PROFILE + ROLE SELECTION CSS
========================================================= */

(function addFindWorkerProfileRoleStyles(){

  if(
    document.getElementById(
      "findworker-profile-role-styles"
    )
  ){
    return;
  }

  const style =
    document.createElement(
      "style"
    );

  style.id =
    "findworker-profile-role-styles";

  style.textContent = `

    .fw-customer-profile-overlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.58);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      box-sizing:border-box;
    }

    #fw-customer-profile{
      position:fixed;
      inset:0;
      z-index:100000;
    }

    .fw-customer-profile-box{
      position:relative;
      width:100%;
      max-width:520px;
      max-height:92vh;
      overflow-y:auto;
      background:#fff;
      border-radius:24px;
      padding:26px;
      box-sizing:border-box;
      box-shadow:0 25px 70px rgba(0,0,0,.28);
    }

    .fw-customer-profile-close{
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

    .fw-customer-profile-header{
      text-align:center;
      padding:4px 35px 18px;
    }

    .fw-customer-profile-icon{
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

    .fw-customer-profile-header h2{
      margin:0;
      color:#172b4d;
      font-size:23px;
    }

    .fw-customer-profile-header p{
      margin:7px 0 0;
      color:#6b7280;
      font-size:13px;
      line-height:1.5;
    }

    #fw-customer-profile-form{
      display:flex;
      flex-direction:column;
      gap:7px;
    }

    #fw-customer-profile-form label{
      font-size:14px;
      font-weight:700;
      color:#263238;
      margin-top:7px;
    }

    #fw-customer-profile-form input{
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

    .fw-customer-profile-note{
      color:#6b7280;
      font-size:12px;
      line-height:1.4;
    }

    .fw-customer-profile-preview{
      width:110px;
      height:110px;
      margin:6px auto 8px;
      border-radius:50%;
      overflow:hidden;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#eef5ff;
      border:3px solid #e6edf8;
      font-size:45px;
    }

    .fw-customer-profile-preview img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

    .fw-customer-profile-save,
    .fw-switch-profile-btn{
      width:100%;
      border-radius:13px;
      padding:14px;
      font-size:15px;
      font-weight:700;
      cursor:pointer;
      margin-top:8px;
      box-sizing:border-box;
    }

    .fw-customer-profile-save{
      border:0;
      background:#1769e0;
      color:#fff;
    }

    .fw-switch-profile-btn{
      border:1px solid #d6dce4;
      background:#fff;
      color:#4b5563;
    }

    .fw-customer-profile-save:disabled{
      opacity:.6;
      cursor:not-allowed;
    }

    .fw-customer-profile-message{
      min-height:20px;
      margin-top:5px;
      text-align:center;
      color:#c62828;
      font-size:13px;
      line-height:1.5;
    }

    .fw-customer-profile-message.success{
      color:#16833b;
      background:#eef9f1;
      border-radius:11px;
      padding:11px;
    }

    #fw-role-selection{
      position:fixed;
      inset:0;
      z-index:1000000;
    }

    .fw-role-selection-backdrop{
      position:absolute;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      box-sizing:border-box;
      background:rgba(7,18,36,.88);
    }

    .fw-role-selection-box{
      width:100%;
      max-width:510px;
      box-sizing:border-box;
      padding:30px;
      border-radius:28px;
      background:#fff;
      box-shadow:0 30px 90px rgba(0,0,0,.32);
    }

    .fw-role-brand{
      display:flex;
      align-items:center;
      gap:12px;
      margin-bottom:24px;
    }

    .fw-role-logo{
      width:48px;
      height:48px;
      border-radius:15px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#1769e0;
      color:#fff;
      font-weight:800;
    }

    .fw-role-brand strong{
      display:block;
      color:#172b4d;
      font-size:18px;
    }

    .fw-role-brand span{
      display:block;
      margin-top:3px;
      color:#7a8491;
      font-size:12px;
    }

    .fw-role-selection-box h1{
      margin:0;
      color:#172b4d;
      font-size:30px;
    }

    .fw-role-subtitle{
      margin:8px 0 22px;
      color:#69727e;
      font-size:14px;
      line-height:1.5;
    }

    .fw-role-options{
      display:flex;
      flex-direction:column;
      gap:12px;
    }

    .fw-role-card{
      width:100%;
      display:flex;
      align-items:center;
      gap:14px;
      text-align:left;
      border:1px solid #e2e7ee;
      background:#fff;
      border-radius:18px;
      padding:16px;
      cursor:pointer;
      transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
    }

    .fw-role-card:hover{
      transform:translateY(-1px);
      border-color:#1769e0;
      box-shadow:0 10px 25px rgba(23,105,224,.10);
      background:#fbfdff;
    }

    .fw-role-card-icon{
      width:52px;
      height:52px;
      border-radius:16px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex:none;
      background:#eef5ff;
      font-size:27px;
    }

    .fw-role-card-content{
      min-width:0;
      flex:1;
    }

    .fw-role-card-content strong{
      display:block;
      color:#172b4d;
      font-size:16px;
    }

    .fw-role-card-content span{
      display:block;
      margin-top:4px;
      color:#737d89;
      font-size:12px;
      line-height:1.45;
    }

    .fw-role-arrow{
      color:#1769e0;
      font-size:28px;
      line-height:1;
      flex:none;
    }

    @media(max-width:520px){
      .fw-customer-profile-overlay,
      .fw-role-selection-backdrop{
        padding:10px;
      }

      .fw-customer-profile-box,
      .fw-role-selection-box{
        max-height:95vh;
        padding:20px 16px;
        border-radius:19px;
      }

      .fw-role-selection-box h1{
        font-size:26px;
      }

      .fw-role-card{
        padding:14px;
      }
    }

  `;

  document.head.appendChild(
    style
  );

})();


/* =========================================================
   STEP 1 — USER ROLE SELECTION
   Worker and Customer use separate profiles.
========================================================= */

function showFindWorkerRoleSelection(force = false){

  const existing =
    document.getElementById(
      "fw-role-selection"
    );

  if(existing){
    existing.remove();
  }

  const savedRole =
    localStorage.getItem(
      "findworker_user_role"
    );

  if(
    !force &&
    (
      savedRole === "worker" ||
      savedRole === "customer"
    )
  ){
    return;
  }

  const overlay =
    document.createElement(
      "div"
    );

  overlay.id =
    "fw-role-selection";

  overlay.innerHTML = `

    <div class="fw-role-selection-backdrop">

      <div class="fw-role-selection-box">

        <div class="fw-role-brand">

          <div class="fw-role-logo">
            FW
          </div>

          <div>
            <strong>FindWorker</strong>
            <span>Service marketplace</span>
          </div>

        </div>

        <h1>
          Aap kaun hain?
        </h1>

        <p class="fw-role-subtitle">
          Apni requirement ke hisaab se option choose karein.
        </p>

        <div class="fw-role-options">

          <button
            type="button"
            class="fw-role-card"
            data-role="worker"
          >

            <div class="fw-role-card-icon">
              👷
            </div>

            <div class="fw-role-card-content">
              <strong>I am a Worker</strong>
              <span>
                Main service provide karta / karti hoon.
              </span>
            </div>

            <div class="fw-role-arrow">
              ›
            </div>

          </button>

          <button
            type="button"
            class="fw-role-card"
            data-role="customer"
          >

            <div class="fw-role-card-icon">
              🏠
            </div>

            <div class="fw-role-card-content">
              <strong>Mujhe Worker Chahiye</strong>
              <span>
                Main kisi worker se kaam karwana chahta / chahti hoon.
              </span>
            </div>

            <div class="fw-role-arrow">
              ›
            </div>

          </button>

        </div>

      </div>

    </div>

  `;

  document.body.appendChild(
    overlay
  );

  overlay
    .querySelectorAll(
      ".fw-role-card"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const role =
              button.dataset.role;

            localStorage.setItem(
              "findworker_user_role",
              role
            );

            document.body.dataset.findworkerRole =
              role;

            overlay.remove();

            if(role === "worker"){

              setTimeout(
                () => {
                  openWorkerRegistration();
                },
                120
              );

              return;

            }

            if(role === "customer"){

              setTimeout(
                () => {
                  openCustomerProfile();
                },
                120
              );

            }

          }
        );

      }
    );

}

/* =========================================================
   INITIAL LOAD
========================================================= */

showFindWorkerRoleSelection();

loadWorkers();


/*
  Registration button setup after
  current page elements are ready.
*/

setupWorkerRegistration();
setupCustomerRequestsButton();
