/* =========================================================
   FINDWORKER
   APP VERSION 6
   CUSTOMER REQUEST SERVICE SYSTEM ADDED
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
   REQUEST SERVICE STYLES
========================================================= */

function injectRequestStyles(){

  if(
    document.getElementById(
      "request-service-styles"
    )
  ){
    return;
  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "request-service-styles";


  style.textContent = `

    .request-service-button{

      width:100%;

      border:none;

      border-radius:14px;

      padding:14px 18px;

      margin:18px 0 12px;

      background:
        linear-gradient(
          135deg,
          #2563eb,
          #1d4ed8
        );

      color:#ffffff;

      font-size:16px;

      font-weight:700;

      cursor:pointer;

      box-shadow:
        0 8px 20px
        rgba(37,99,235,.22);

      transition:
        transform .2s ease,
        box-shadow .2s ease;

    }


    .request-service-button:hover{

      transform:translateY(-2px);

      box-shadow:
        0 12px 26px
        rgba(37,99,235,.30);

    }


    .request-service-modal{

      position:fixed;

      inset:0;

      z-index:99999;

      display:flex;

      align-items:center;

      justify-content:center;

      padding:18px;

      background:
        rgba(15,23,42,.72);

      backdrop-filter:
        blur(7px);

      overflow-y:auto;

    }


    .request-service-box{

      width:min(
        100%,
        480px
      );

      background:#ffffff;

      border-radius:24px;

      padding:24px;

      box-shadow:
        0 25px 70px
        rgba(0,0,0,.25);

      position:relative;

      animation:
        requestBoxIn .25s ease;

    }


    @keyframes requestBoxIn{

      from{

        opacity:0;

        transform:
          translateY(20px)
          scale(.97);

      }

      to{

        opacity:1;

        transform:
          translateY(0)
          scale(1);

      }

    }


    .request-close{

      position:absolute;

      top:14px;

      right:14px;

      width:38px;

      height:38px;

      border:none;

      border-radius:50%;

      background:#f1f5f9;

      color:#334155;

      font-size:25px;

      line-height:1;

      cursor:pointer;

    }


    .request-header{

      padding-right:42px;

      margin-bottom:20px;

    }


    .request-header h2{

      margin:0 0 6px;

      font-size:24px;

      color:#0f172a;

    }


    .request-header p{

      margin:0;

      color:#64748b;

      font-size:14px;

      line-height:1.5;

    }


    .request-worker-name{

      color:#2563eb;

      font-weight:700;

    }


    .request-form-group{

      margin-bottom:15px;

    }


    .request-form-group label{

      display:block;

      margin-bottom:7px;

      font-size:14px;

      font-weight:700;

      color:#334155;

    }


    .request-form-group input,

    .request-form-group textarea{

      width:100%;

      box-sizing:border-box;

      border:1px solid #dbe3ee;

      border-radius:12px;

      padding:12px 14px;

      font-size:15px;

      outline:none;

      background:#ffffff;

      color:#0f172a;

      transition:
        border-color .2s ease,
        box-shadow .2s ease;

    }


    .request-form-group input:focus,

    .request-form-group textarea:focus{

      border-color:#2563eb;

      box-shadow:
        0 0 0 3px
        rgba(37,99,235,.10);

    }


    .request-form-group input[readonly]{

      background:#f8fafc;

      color:#475569;

      cursor:not-allowed;

    }


    .request-form-group textarea{

      min-height:105px;

      resize:vertical;

    }


    .request-submit-button{

      width:100%;

      border:none;

      border-radius:13px;

      padding:14px;

      background:
        linear-gradient(
          135deg,
          #16a34a,
          #15803d
        );

      color:#ffffff;

      font-size:16px;

      font-weight:700;

      cursor:pointer;

      margin-top:5px;

    }


    .request-submit-button:disabled{

      opacity:.65;

      cursor:not-allowed;

    }


    .request-error{

      display:none;

      margin-bottom:14px;

      padding:11px 13px;

      border-radius:10px;

      background:#fef2f2;

      border:1px solid #fecaca;

      color:#b91c1c;

      font-size:13px;

      line-height:1.45;

    }


    .request-error.show{

      display:block;

    }


    .request-success{

      text-align:center;

      padding:20px 5px 10px;

    }


    .request-success-icon{

      width:70px;

      height:70px;

      margin:0 auto 15px;

      border-radius:50%;

      display:flex;

      align-items:center;

      justify-content:center;

      background:#dcfce7;

      color:#16a34a;

      font-size:36px;

    }


    .request-success h2{

      margin:0 0 8px;

      color:#0f172a;

    }


    .request-success p{

      margin:0 0 20px;

      color:#64748b;

      font-size:14px;

      line-height:1.5;

    }


    .request-done-button{

      width:100%;

      border:none;

      border-radius:12px;

      padding:13px;

      background:#0f172a;

      color:#ffffff;

      font-weight:700;

      cursor:pointer;

    }


  `;


  document.head.appendChild(
    style
  );

}


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
========================================================= */

function getWorkerPhoto(worker){

  /*
    Your Supabase workers table uses:
    photo url

    Fallback photo_url is kept for compatibility.
  */

  const photo =
    String(
      worker["photo url"]
      ??
      worker.photo_url
      ??
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
   REQUEST SERVICE FORM
========================================================= */

function showRequestServiceForm(
  worker
){

  const old =
    document.querySelector(
      ".request-service-modal"
    );


  if(old){
    old.remove();
  }


  const modal =
    document.createElement(
      "div"
    );


  modal.className =
    "request-service-modal";


  modal.innerHTML = `

    <div class="request-service-box">

      <button
        type="button"
        class="request-close"
        aria-label="Close"
      >
        ×
      </button>


      <div class="request-header">

        <h2>
          Request Service
        </h2>

        <p>
          Send your service request to
          <span class="request-worker-name">
            ${escapeHTML(worker.name)}
          </span>
        </p>

      </div>


      <div
        class="request-error"
        id="request-form-error"
      ></div>


      <form
        id="request-service-form"
      >


        <div class="request-form-group">

          <label>
            Your Name
          </label>

          <input
            type="text"
            id="request-customer-name"
            placeholder="Enter your name"
            maxlength="100"
            required
          >

        </div>


        <div class="request-form-group">

          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            id="request-customer-mobile"
            placeholder="Enter 10-digit mobile number"
            inputmode="numeric"
            maxlength="10"
            required
          >

        </div>


        <div class="request-form-group">

          <label>
            Service
          </label>

          <input
            type="text"
            value="${escapeHTML(worker.service)}"
            readonly
          >

        </div>


        <div class="request-form-group">

          <label>
            Your Area
          </label>

          <input
            type="text"
            id="request-customer-area"
            placeholder="Enter your area / locality"
            maxlength="150"
            required
          >

        </div>


        <div class="request-form-group">

          <label>
            Request Details
          </label>

          <textarea
            id="request-details"
            placeholder="Tell the worker what service you need..."
            maxlength="1000"
          ></textarea>

        </div>


        <button
          type="submit"
          class="request-submit-button"
          id="request-submit-button"
        >
          📩 Send Service Request
        </button>


      </form>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  const closeButton =
    modal.querySelector(
      ".request-close"
    );


  const form =
    modal.querySelector(
      "#request-service-form"
    );


  const errorBox =
    modal.querySelector(
      "#request-form-error"
    );


  const submitButton =
    modal.querySelector(
      "#request-submit-button"
    );


  closeButton.addEventListener(
    "click",
    () => {

      modal.remove();

    }
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


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      errorBox.classList.remove(
        "show"
      );

      errorBox.textContent =
        "";


      const customerName =
        document
          .getElementById(
            "request-customer-name"
          )
          .value
          .trim();


      const customerMobile =
        document
          .getElementById(
            "request-customer-mobile"
          )
          .value
          .replace(
            /\D/g,
            ""
          );


      const customerArea =
        document
          .getElementById(
            "request-customer-area"
          )
          .value
          .trim();


      const requestDetails =
        document
          .getElementById(
            "request-details"
          )
          .value
          .trim();


      if(
        !customerName ||
        !customerMobile ||
        !customerArea
      ){

        errorBox.textContent =
          "Please fill all required fields.";

        errorBox.classList.add(
          "show"
        );

        return;
      }


      if(
        !/^[6-9]\d{9}$/.test(
          customerMobile
        )
      ){

        errorBox.textContent =
          "Please enter a valid 10-digit Indian mobile number.";

        errorBox.classList.add(
          "show"
        );

        return;
      }


      submitButton.disabled =
        true;


      submitButton.textContent =
        "Sending Request...";


      try{

        const {
          error
        } =
          await supabaseClient
            .from(
              "service_requests"
            )
            .insert([
              {

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

              }
            ]);


        if(error){

          console.error(
            "Service request error:",
            error
          );


          errorBox.textContent =
            "Request could not be sent. Please try again.";

          errorBox.classList.add(
            "show"
          );


          submitButton.disabled =
            false;


          submitButton.textContent =
            "📩 Send Service Request";


          return;
        }


        showRequestSuccess(
          modal,
          worker
        );

      }
      catch(error){

        console.error(
          "Service request failed:",
          error
        );


        errorBox.textContent =
          "Something went wrong. Please try again.";

        errorBox.classList.add(
          "show"
        );


        submitButton.disabled =
          false;


        submitButton.textContent =
          "📩 Send Service Request";

      }

    }
  );


  const mobileInput =
    modal.querySelector(
      "#request-customer-mobile"
    );


  mobileInput.addEventListener(
    "input",
    () => {

      mobileInput.value =
        mobileInput.value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            10
          );

    }
  );

}


/* =========================================================
   REQUEST SUCCESS
========================================================= */

function showRequestSuccess(
  modal,
  worker
){

  const box =
    modal.querySelector(
      ".request-service-box"
    );


  box.innerHTML = `

    <button
      type="button"
      class="request-close"
      aria-label="Close"
    >
      ×
    </button>


    <div class="request-success">

      <div class="request-success-icon">
        ✓
      </div>


      <h2>
        Request Sent Successfully!
      </h2>


      <p>
        Your service request has been
        sent for <strong>
          ${escapeHTML(worker.service)}
        </strong>.
        The worker can now respond to your request.
      </p>


      <button
        type="button"
        class="request-done-button"
      >
        Done
      </button>

    </div>

  `;


  box
    .querySelector(
      ".request-close"
    )
    .addEventListener(
      "click",
      () => {

        modal.remove();

      }
    );


  box
    .querySelector(
      ".request-done-button"
    )
    .addEventListener(
      "click",
      () => {

        modal.remove();

      }
    );

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


  const startingCharge =
    worker["starting charge"]
    ??
    worker.starting_charge
    ??
    "";


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
              startingCharge
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


      <!-- REQUEST SERVICE -->

      <button
        type="button"
        class="request-service-button"
      >
        📩 Request Service
      </button>


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
            String(
              worker.mobile || ""
            ).replace(
              /\D/g,
              ""
            )
          )}"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp
        </a>


      </div>


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
      ".request-service-button"
    )
    .addEventListener(
      "click",
      () => {

        showRequestServiceForm(
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


      const requestModal =
        document.querySelector(
          ".request-service-modal"
        );


      if(requestModal){

        requestModal.remove();

      }

    }

  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

injectRequestStyles();

loadWorkers();
