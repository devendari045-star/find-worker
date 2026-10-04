/* =========================================================
   FINDWORKER FINAL ROLE SEPARATION FIX
   PASTE THIS ENTIRE BLOCK AT THE VERY BOTTOM OF app.js
========================================================= */

(function(){

  /* =======================================================
     CUSTOMER PROFILE
  ======================================================= */

  function openCustomerProfileFinal(){

    const old =
      document.getElementById(
        "fw-customer-profile-final"
      );

    if(old){
      old.remove();
    }

    const modal =
      document.createElement(
        "div"
      );

    modal.id =
      "fw-customer-profile-final";

    modal.innerHTML = `

      <div class="fw-final-customer-overlay">

        <div class="fw-final-customer-box">

          <button
            type="button"
            class="fw-final-customer-close"
          >
            ×
          </button>

          <button
            type="button"
            class="fw-final-change-role"
          >
            Change Role
          </button>

          <div class="fw-final-customer-head">

            <div class="fw-final-customer-icon">
              🏠
            </div>

            <h2>
              Customer Profile
            </h2>

            <p>
              Apni details save karein.
            </p>

          </div>

          <form id="fw-final-customer-form">

            <label>
              Full Name *
            </label>

            <input
              id="fw-final-customer-name"
              type="text"
              required
              placeholder="Enter your name"
            >

            <label>
              Mobile Number *
            </label>

            <input
              id="fw-final-customer-mobile"
              type="tel"
              required
              inputmode="numeric"
              placeholder="Enter mobile number"
            >

            <label>
              Area
            </label>

            <input
              id="fw-final-customer-area"
              type="text"
              placeholder="Enter your area"
            >

            <label>
              Profile Photo
            </label>

            <input
              id="fw-final-customer-photo"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
            >

            <div
              id="fw-final-customer-preview"
              class="fw-final-customer-preview"
            >
              👤
            </div>

            <div
              id="fw-final-customer-message"
              class="fw-final-customer-message"
            ></div>

            <button
              id="fw-final-customer-save"
              type="submit"
            >
              Save Customer Profile
            </button>

          </form>

        </div>

      </div>

    `;

    document.body.appendChild(
      modal
    );


    const close =
      modal.querySelector(
        ".fw-final-customer-close"
      );


    const changeRole =
      modal.querySelector(
        ".fw-final-change-role"
      );


    const form =
      modal.querySelector(
        "#fw-final-customer-form"
      );


    const name =
      modal.querySelector(
        "#fw-final-customer-name"
      );


    const mobile =
      modal.querySelector(
        "#fw-final-customer-mobile"
      );


    const area =
      modal.querySelector(
        "#fw-final-customer-area"
      );


    const photo =
      modal.querySelector(
        "#fw-final-customer-photo"
      );


    const preview =
      modal.querySelector(
        "#fw-final-customer-preview"
      );


    const message =
      modal.querySelector(
        "#fw-final-customer-message"
      );


    const save =
      modal.querySelector(
        "#fw-final-customer-save"
      );


    close.addEventListener(
      "click",
      () => modal.remove()
    );


    changeRole.addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "findworker_user_role"
        );

        modal.remove();

        showFinalRoleSelection();

      }
    );


    photo.addEventListener(
      "change",
      () => {

        const file =
          photo.files[0];

        if(!file){
          return;
        }


        const allowed = [
          "image/jpeg",
          "image/png",
          "image/webp"
        ];


        if(
          !allowed.includes(
            file.type
          )
        ){

          message.textContent =
            "Photo sirf JPG, PNG ya WEBP honi chahiye.";

          photo.value =
            "";

          return;

        }


        if(
          file.size >
          5 * 1024 * 1024
        ){

          message.textContent =
            "Profile photo maximum 5 MB ki ho sakti hai.";

          photo.value =
            "";

          return;

        }


        const reader =
          new FileReader();


        reader.onload =
          event => {

            preview.innerHTML = `

              <img
                src="${event.target.result}"
                alt="Customer profile"
              >

            `;

          };


        reader.readAsDataURL(
          file
        );


        message.textContent =
          "";

      }
    );


    const savedMobile =
      localStorage.getItem(
        "findworker_customer_mobile"
      ) ||
      "";


    if(savedMobile){

      mobile.value =
        savedMobile;


      supabaseClient
        .from(
          "customer_profiles"
        )
        .select(
          "*"
        )
        .eq(
          "mobile",
          savedMobile
        )
        .maybeSingle()
        .then(
          ({
            data,
            error
          }) => {

            if(error){

              console.warn(
                "Customer profile load error:",
                error
              );

              return;

            }


            if(!data){

              return;

            }


            name.value =
              data.name ||
              "";


            mobile.value =
              data.mobile ||
              savedMobile;


            area.value =
              data.area ||
              "";


            if(data.photo_url){

              preview.innerHTML = `

                <img
                  src="${escapeHTML(data.photo_url)}"
                  alt="Customer profile"
                >

              `;

            }

          }
        );

    }


    form.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const customerName =
          name.value.trim();


        const customerMobile =
          mobile.value.trim();


        const customerArea =
          area.value.trim();


        const file =
          photo.files[0];


        if(
          !customerName ||
          !customerMobile
        ){

          message.textContent =
            "Name aur mobile number required hai.";

          return;

        }


        save.disabled =
          true;


        save.textContent =
          "Saving...";


        message.textContent =
          "";


        try{

          let photoURL =
            null;


          const existing =
            await supabaseClient
              .from(
                "customer_profiles"
              )
              .select(
                "photo_url"
              )
              .eq(
                "mobile",
                customerMobile
              )
              .maybeSingle();


          if(existing.error){

            throw existing.error;

          }


          photoURL =
            existing.data?.photo_url ||
            null;


          if(file){

            const allowed = [
              "image/jpeg",
              "image/png",
              "image/webp"
            ];


            if(
              !allowed.includes(
                file.type
              )
            ){

              throw new Error(
                "Photo sirf JPG, PNG ya WEBP honi chahiye."
              );

            }


            if(
              file.size >
              5 * 1024 * 1024
            ){

              throw new Error(
                "Profile photo maximum 5 MB ki ho sakti hai."
              );

            }


            const safeName =
              file.name.replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
              );


            const path =
              `customer-profile/${Date.now()}-${Math.random()
                .toString(36)
                .substring(2,10)}-${safeName}`;


            const upload =
              await supabaseClient
                .storage
                .from(
                  "worker-photos"
                )
                .upload(
                  path,
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


            if(upload.error){

              throw upload.error;

            }


            const publicData =
              supabaseClient
                .storage
                .from(
                  "worker-photos"
                )
                .getPublicUrl(
                  path
                );


            photoURL =
              publicData.data?.publicUrl ||
              photoURL;

          }


          const result =
            await supabaseClient
              .from(
                "customer_profiles"
              )
              .upsert(
                {
                  name:
                    customerName,

                  mobile:
                    customerMobile,

                  area:
                    customerArea,

                  photo_url:
                    photoURL
                },
                {
                  onConflict:
                    "mobile"
                }
              );


          if(result.error){

            throw result.error;

          }


          localStorage.setItem(
            "findworker_customer_mobile",
            customerMobile
          );


          localStorage.setItem(
            "findworker_customer_name",
            customerName
          );


          message.className =
            "fw-final-customer-message success";


          message.textContent =
            "Customer Profile saved successfully!";


          save.textContent =
            "Profile Saved";

        }
        catch(error){

          console.error(
            "Customer profile error:",
            error
          );


          message.textContent =
            error.message ||
            "Customer profile save nahi ho paayi.";


          save.disabled =
            false;


          save.textContent =
            "Save Customer Profile";

        }

      }
    );

  }


  /* =======================================================
     NEW FINAL ROLE SCREEN
  ======================================================= */

  function showFinalRoleSelection(){

    const old =
      document.getElementById(
        "fw-final-role-selection"
      );


    if(old){
      old.remove();
    }


    const overlay =
      document.createElement(
        "div"
      );


    overlay.id =
      "fw-final-role-selection";


    overlay.innerHTML = `

      <div class="fw-final-role-backdrop">

        <div class="fw-final-role-box">

          <div class="fw-final-brand">
            FindWorker
          </div>

          <h1>
            Aap kaun hain?
          </h1>

          <p>
            Apni requirement ke hisaab se option choose karein.
          </p>


          <button
            type="button"
            class="fw-final-role-card"
            data-role="worker"
          >

            <span class="fw-final-role-icon">
              👷
            </span>

            <span>

              <strong>
                I am a Worker
              </strong>

              <small>
                Main service provide karta / karti hoon.
              </small>

            </span>

            <b>
              ›
            </b>

          </button>


          <button
            type="button"
            class="fw-final-role-card"
            data-role="customer"
          >

            <span class="fw-final-role-icon">
              🏠
            </span>

            <span>

              <strong>
                Mujhe Worker Chahiye
              </strong>

              <small>
                Main worker se kaam karwana chahta / chahti hoon.
              </small>

            </span>

            <b>
              ›
            </b>

          </button>

        </div>

      </div>

    `;


    document.body.appendChild(
      overlay
    );


    overlay
      .querySelectorAll(
        ".fw-final-role-card"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            event => {

              event.preventDefault();


              const role =
                button.dataset.role;


              localStorage.setItem(
                "findworker_user_role",
                role
              );


              overlay.remove();


              if(
                role ===
                "worker"
              ){

                openWorkerRegistration();

                return;

              }


              if(
                role ===
                "customer"
              ){

                openCustomerProfileFinal();

              }

            }
          );

        }
      );

  }


  /* =======================================================
     ROLE-AWARE PROFILE BUTTON
  ======================================================= */

  function openRoleAwareProfile(){

    const role =
      localStorage.getItem(
        "findworker_user_role"
      );


    if(
      role ===
      "worker"
    ){

      openWorkerRegistration();

      return;

    }


    if(
      role ===
      "customer"
    ){

      openCustomerProfileFinal();

      return;

    }


    showFinalRoleSelection();

  }


  /* =======================================================
     CAPTURE PROFILE CLICK
     This overrides the old Profile listener.
  ======================================================= */

  document.addEventListener(
    "click",
    event => {

      const profileButton =
        event.target.closest(
          '#bottom-profile, [data-nav="profile"], [data-page="profile"]'
        );


      if(
        !profileButton
      ){

        return;

      }


      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      openRoleAwareProfile();

    },
    true
  );


  /* =======================================================
     CAPTURE OLD ROLE SCREEN CLICK
     This overrides the old role listener.
  ======================================================= */

  document.addEventListener(
    "click",
    event => {

      const oldRoleButton =
        event.target.closest(
          "#fw-role-selection .fw-role-card"
        );


      if(
        !oldRoleButton
      ){

        return;

      }


      event.preventDefault();

      event.stopPropagation();

      event.stopImmediatePropagation();


      const role =
        oldRoleButton.dataset.role;


      localStorage.setItem(
        "findworker_user_role",
        role
      );


      const oldOverlay =
        document.getElementById(
          "fw-role-selection"
        );


      if(oldOverlay){

        oldOverlay.remove();

      }


      if(
        role ===
        "worker"
      ){

        openWorkerRegistration();

        return;

      }


      if(
        role ===
        "customer"
      ){

        openCustomerProfileFinal();

      }

    },
    true
  );


  /* =======================================================
     CHANGE ROLE
  ======================================================= */

  document.addEventListener(
    "click",
    event => {

      const changeButton =
        event.target.closest(
          ".fw-change-role-button, .fw-final-change-role"
        );


      if(
        !changeButton
      ){

        return;

      }


      event.preventDefault();

      event.stopPropagation();


      localStorage.removeItem(
        "findworker_user_role"
      );


      const customer =
        document.getElementById(
          "fw-customer-profile-final"
        );


      if(customer){

        customer.remove();

      }


      const oldRole =
        document.getElementById(
          "fw-role-selection"
        );


      if(oldRole){

        oldRole.remove();

      }


      showFinalRoleSelection();

    },
    true
  );


  /* =======================================================
     FINAL UI CSS
  ======================================================= */

  const style =
    document.createElement(
      "style"
    );


  style.id =
    "fw-final-role-styles";


  style.textContent = `

    #fw-final-role-selection,
    #fw-customer-profile-final{

      position:fixed;
      inset:0;
      z-index:1000001;

    }


    .fw-final-role-backdrop,
    .fw-final-customer-overlay{

      position:absolute;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:18px;
      box-sizing:border-box;
      background:rgba(
        7,
        18,
        36,
        .88
      );

    }


    .fw-final-role-box,
    .fw-final-customer-box{

      position:relative;
      width:100%;
      max-width:520px;
      max-height:92vh;
      overflow-y:auto;
      background:#fff;
      border-radius:24px;
      padding:28px;
      box-sizing:border-box;
      box-shadow:
        0 25px 70px rgba(
          0,
          0,
          0,
          .30
        );

    }


    .fw-final-brand{

      font-size:22px;
      font-weight:800;
      color:#1769e0;
      margin-bottom:22px;

    }


    .fw-final-role-box h1{

      margin:0;
      color:#172b4d;
      font-size:28px;

    }


    .fw-final-role-box p{

      margin:7px 0 20px;
      color:#69727e;
      font-size:14px;

    }


    .fw-final-role-card{

      width:100%;
      display:flex;
      align-items:center;
      gap:13px;
      border:1px solid #e1e7ef;
      background:#fff;
      border-radius:17px;
      padding:15px;
      margin-top:11px;
      text-align:left;
      cursor:pointer;
      box-sizing:border-box;

    }


    .fw-final-role-card:hover{

      border-color:#1769e0;
      background:#fbfdff;

    }


    .fw-final-role-icon{

      width:52px;
      height:52px;
      border-radius:15px;
      background:#eef5ff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:27px;
      flex:none;

    }


    .fw-final-role-card span:nth-child(2){

      flex:1;
      min-width:0;

    }


    .fw-final-role-card strong{

      display:block;
      color:#172b4d;
      font-size:16px;

    }


    .fw-final-role-card small{

      display:block;
      color:#737d89;
      font-size:12px;
      margin-top:4px;
      line-height:1.4;

    }


    .fw-final-role-card b{

      color:#1769e0;
      font-size:27px;

    }


    .fw-final-customer-close{

      position:absolute;
      right:14px;
      top:13px;
      width:38px;
      height:38px;
      border:0;
      border-radius:50%;
      background:#f1f3f5;
      font-size:25px;
      cursor:pointer;

    }


    .fw-final-change-role{

      position:absolute;
      left:16px;
      top:16px;
      border:1px solid #d6dce4;
      border-radius:10px;
      padding:7px 10px;
      background:#fff;
      color:#1769e0;
      font-size:12px;
      font-weight:700;
      cursor:pointer;

    }


    .fw-final-customer-head{

      text-align:center;
      padding:22px 34px 17px;

    }


    .fw-final-customer-icon{

      width:58px;
      height:58px;
      margin:0 auto 10px;
      border-radius:50%;
      background:#eef5ff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:28px;

    }


    .fw-final-customer-head h2{

      margin:0;
      color:#172b4d;

    }


    .fw-final-customer-head p{

      margin:6px 0 0;
      color:#69727e;
      font-size:13px;

    }


    #fw-final-customer-form{

      display:flex;
      flex-direction:column;
      gap:8px;

    }


    #fw-final-customer-form label{

      font-size:14px;
      font-weight:700;
      color:#263238;
      margin-top:6px;

    }


    #fw-final-customer-form input{

      width:100%;
      box-sizing:border-box;
      border:1px solid #d6dce4;
      border-radius:11px;
      padding:12px;
      font-size:14px;
      font-family:inherit;
      outline:none;

    }


    .fw-final-customer-preview{

      width:110px;
      height:110px;
      margin:8px auto 3px;
      border-radius:50%;
      overflow:hidden;
      border:3px solid #e6edf8;
      background:#eef5ff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:42px;

    }


    .fw-final-customer-preview img{

      width:100%;
      height:100%;
      object-fit:cover;
      display:block;

    }


    #fw-final-customer-save{

      width:100%;
      border:0;
      border-radius:13px;
      padding:14px;
      background:#1769e0;
      color:#fff;
      font-size:15px;
      font-weight:700;
      cursor:pointer;
      margin-top:10px;

    }


    #fw-final-customer-save:disabled{

      opacity:.6;
      cursor:not-allowed;

    }


    .fw-final-customer-message{

      min-height:20px;
      margin-top:4px;
      text-align:center;
      color:#c62828;
      font-size:13px;

    }


    .fw-final-customer-message.success{

      color:#16833b;
      font-weight:700;

    }

  `;


  document.head.appendChild(
    style
  );


  /* =======================================================
     TESTING RESET
     If there is no saved role, show final role screen.
  ======================================================= */

  setTimeout(
    () => {

      const role =
        localStorage.getItem(
          "findworker_user_role"
        );


      if(
        !role
      ){

        const old =
          document.getElementById(
            "fw-role-selection"
          );


        if(old){

          old.remove();

        }


        showFinalRoleSelection();

      }

    },
    250
  );

})();
