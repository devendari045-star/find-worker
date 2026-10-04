/* =========================================================
   STEP 1 — APP ROLE SELECTION
   Customer = people who need a worker
   Worker   = people who provide services
========================================================= */

function showFindWorkerRoleSelection(){

  if(
    document.getElementById(
      "fw-role-selection"
    )
  ){
    return;
  }

  const savedRole =
    localStorage.getItem(
      "findworker_user_role"
    );

  if(
    savedRole === "customer" ||
    savedRole === "worker"
  ){
    return;
  }

  const overlay =
    document.createElement("div");

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

            <strong>
              FindWorker
            </strong>

            <span>
              Service marketplace
            </span>

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

              <strong>
                I am a Worker
              </strong>

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

              <strong>
                Mujhe Worker Chahiye
              </strong>

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


            overlay.remove();


            document.body.dataset.findworkerRole =
              role;


            /*
              CUSTOMER
              → normal customer app
            */

            if(
              role === "customer"
            ){

              return;

            }


            /*
              WORKER
              → worker registration
            */

            if(
              role === "worker"
            ){

              setTimeout(
                () => {

                  if(
                    typeof openWorkerRegistration ===
                    "function"
                  ){

                    openWorkerRegistration();

                  }

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
   ROLE SELECTION CSS
========================================================= */

(function addFindWorkerRoleStyles(){

  if(
    document.getElementById(
      "findworker-role-styles"
    )
  ){

    return;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "findworker-role-styles";


  style.textContent = `

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

      background:
        radial-gradient(
          circle at top,
          rgba(23,105,224,.16),
          transparent 45%
        ),
        rgba(7,18,36,.88);

    }


    .fw-role-selection-box{

      width:100%;
      max-width:510px;
      box-sizing:border-box;
      padding:30px;
      border-radius:28px;
      background:#fff;

      box-shadow:
        0 30px 90px rgba(
          0,
          0,
          0,
          .32
        );

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
      letter-spacing:.5px;

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

      transition:
        transform .18s ease,
        border-color .18s ease,
        box-shadow .18s ease,
        background .18s ease;

    }


    .fw-role-card:hover{

      transform:translateY(-1px);
      border-color:#1769e0;

      box-shadow:
        0 10px 25px rgba(
          23,
          105,
          224,
          .10
        );

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

      .fw-role-selection-box{

        padding:22px 16px;
        border-radius:22px;

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
