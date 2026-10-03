/* =========================================================
   FINDWORKER
   APP VERSION 5
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
========================================================= */

function getWorkerPhoto(worker){

  const photo =
    String(
      worker.photo_url || ""
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


  /*
    ONLY STARTING LETTER / STARTING TEXT

    A  -> AC..., Aluminium..., Appliance...
    B  -> Bathroom..., Beautician..., Bike...
    C  -> Car..., Carpenter..., CCTV...
  */

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


    /*
      When a service is selected,
      find workers whose service
      contains that service.
    */

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


      <!-- ONLY CIRCLE PHOTO -->

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
              worker.starting_charge ?? ""
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

    }

  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

loadWorkers();
