//Starting point for JQuery init
$(document).ready(function () {
   /*
      $("#searchResult").hide();
      $("#btn_Search").click(function (e) {
         loaddata($("#seachfield").val());
      });
      */
   //loaddata('');
   //$('.active a').tab('show');
   loadAppointments();

   $("#navTabs a").click(function (e) {
      e.preventDefault();

      var href = this.hash;
      $(".active").removeClass("active");
      $(href).addClass("active");
      $(this).addClass("active");
   });

   //Get form element
   var form = document.getElementById("form_poll_1");
   function submitForm(event) {
      //Preventing page refresh
      event.preventDefault();

      $.ajax({
         type: "GET",
         url: "addAppointment2.html",
         data: {},
         success: function (data) {
            $("#tab_add").html(data);
         },
      });
   }
   //Calling a function during form submission.
   form.addEventListener("submit", submitForm);
});

// function loaddata(searchterm) {
//    $.ajax({
//       type: "GET",
//       url: "../backend/serviceHandler.php",
//       cache: false,
//       data: { method: "saveDemoDataToDB", param: searchterm },
//       dataType: "json",
//       success: function (response) {
//          console.log(response);
//       },
//       error: function (response) {
//          console.log(response);
//       },
//    });
// }

function validateForm() {
   return checkChoices();
}

function checkChoices() {
   var choice0 = document.getElementById("choice0").value;
   var choice1 = document.getElementById("choice1").value;

   if (choice0 == "" || choice1 == "") {
      alert("Choice 0 and Choice 1 must not be empty");
      return false;
   }
   return true;
}

function loadAppointments() {
   let searchterm = "";
   $.ajax({
      type: "GET",
      url: "../backend/serviceHandler.php",
      cache: false,
      data: { method: "queryAppointments", param: searchterm },
      dataType: "json",
      success: function (appointments) {
         displayAppointments(appointments);
      },
      error: function (error) {
         console.error("Error loading appointments: ", error);
      },
   });
}

function loadDateOptions(id, callback) {
   $.ajax({
      type: "GET",
      url: "../backend/serviceHandler.php",
      cache: false,
      data: { method: "queryDateOptionByID", param: id },
      dataType: "json",
      success: function (dateOptions) {
         console.log("Date options loaded: ", dateOptions);
         callback(dateOptions); 
      },
      error: function (error) {
         console.error("Error loading date options: ", error);
      },
   });
}

function displayAppointments(appointments) {
   const container = $("#appointmentsList");
   container.empty();

   appointments.forEach((appointment) => {
      const card = `
           <div class="card mb-3" data-id="${appointment.appointment_id}">
               <div class="card-header">Appointment ID: ${appointment.appointment_id}</div>
               <div class="card-body">
                   <h5 class="card-title">Location: ${appointment.location}</h5>
                   <p class="card-text">Start: ${appointment.date}</p>
                   <p class="card-text">Voting ends: ${appointment.voting_deadline}</p>
               </div>
           </div>
       `;
      container.append(card);
   });

   container.on("click", ".card", function () {
      const appointmentId = $(this).data("id");
      const appointment = appointments.find(a => a.appointment_id == appointmentId);
      if (!appointment) return;

      loadDateOptions(appointmentId, function (dateOptions) {
         const now = new Date();
         const deadline = new Date(appointment.voting_deadline);
         const isVotingOpen = now < deadline;

         const modalBody = $("#appointmentModal .modal-body");

         let dateOptionsHtml = '';
         if (dateOptions && dateOptions.length > 0) {
            dateOptions.forEach((dateOption, index) => {
               dateOptionsHtml += `<div class="form-check">
                       <input class="form-check-input" type="checkbox" value="${dateOption}" id="dateOption${index}">
                       <label class="form-check-label" for="dateOption${index}">
                           ${dateOption}
                       </label>
                   </div>`;
            });
         }

         modalBody.html(`
               <p>Location: ${appointment.location}</p>
               <p>Date: ${appointment.date}</p>
               <p>Voting Deadline: ${appointment.voting_deadline}</p>
               <input type="text" id="userName" placeholder="Your name" class="form-control mb-2">
               ${isVotingOpen ? `<div>${dateOptionsHtml}<button class="btn btn-primary" onclick="voteOnTimeOptions('${appointment.appointment_id}')">Vote on Times</button></div>` : "<p>Voting has ended.</p>"}
               <textarea id="comment" placeholder="Leave a comment" class="form-control my-2"></textarea>
               <button class="btn btn-success" onclick="submitComment('${appointment.appointment_id}')">Submit Comment</button>
           `);

         // Show modal
         $("#appointmentModal").modal("show");
      });
   });
}