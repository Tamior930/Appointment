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
        data: {
            method: "queryAppointments",
            param: searchterm,
        },
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
        data: {
            method: "queryDateOptionByID",
            param: id,
        },
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

        // Je nachdem welches Appointment anklicken wird es in die Variable Appointment gespeichert über die .find() suche
        const appointment = appointments.find(
            (a) => a.appointment_id == appointmentId
        );
        if (!appointment) return;

        // Datum Optionen anzeigen lassen, wenn man Appointment klickt. Geht über Ajax Call mit Callback (Return dateOptions!!)
        loadDateOptions(appointmentId, function (dateOptions) {
            const now = new Date();
            const deadline = new Date(appointment.voting_deadline);
            const isVotingOpen = now < deadline; // Prüfen, ob die Abstimmung noch offen ist

            let dateOptionsHtml = "";
            let userInputHtml = "";

            // Überprüfen, ob das Voting noch verfügbar ist
            if (isVotingOpen) {
                if (dateOptions) {
                    dateOptions.forEach((dateOption, index) => {
                        dateOptionsHtml += `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${index}" id="dateOption${index}">
                                <label class="form-check-label" for="dateOption${index}">
                                    ${dateOption}
                                </label>
                            </div>
                        `;
                    });
                }
                // Name, Kommentar HTML
                userInputHtml = `
                    <input type="text" id="username" placeholder="Your name" class="form-control mb-2">
                    <textarea id="comment" placeholder="Leave a comment" class="form-control my-2"></textarea>
                    <button class="btn btn-primary" onclick="handleSubmission('${appointment.appointment_id}', '${isVotingOpen}')">Submit</button>
                    <div class="alertContainer mt-3" id="alertContainer${appointment.appointment_id}"></div>
                `;
            } else { // Falls Voting zu ist.
                userInputHtml = "<p>Voting has ended.</p>";
                dateOptionsHtml = "";
            }


            // Detail Ansicht
            $("#appointmentModal .modal-body").html(`
             <p>Location: ${appointment.location}</p>
             <p>Date: ${appointment.date}</p>
             <p>Voting Deadline: ${appointment.voting_deadline}</p>
             ${dateOptionsHtml}
             ${userInputHtml}
         `);

            // Modal anzeigen
            $("#appointmentModal").modal("show");
        });
    });
}

function handleSubmission(appointmentId) {

    const username = document.getElementById("username").value;
    const comment = document.getElementById("comment").value;

    const selectedDateOptions = [];
    const checkboxes = document.querySelectorAll('.form-check-input');

    if (username == "") {
        showAlert("Please enter your name.", "danger", appointmentId);
        return;
    }

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedDateOptions.push(checkbox.value);
        }
    });

    if (selectedDateOptions.length === 0) {
        showAlert("Please select at least one date option.", "danger", appointmentId);
        return;
    }

    var submissionData = {
        appointmentId: appointmentId,
        option_id: dateOptionIndex, // DAS MUSS DU NOCH NACHSCHAUEN
        username: username,
        comment: comment,
        dateOptions: selectedDateOptions,
    };

    insertDateOptions(submissionData);
}

function insertDateOptions(submissionData) {
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {
            method: "insertDateOptions",
            param: submissionData,
        },
        dataType: "json",
        success: function () {
            showAlert("Your response has been submitted successfully!", "success", submissionData.appointmentId); // Zeigt Success Meldung in Modal Alert
            // $("#appointmentModal").modal("hide");
            // loadAppointments(); // Refresh the list of appointments
        },
        error: function (error) {
            console.error("Error submitting response: ", error);
            showAlert(
                "There was an error submitting your response. Please try again.",
                "danger", submissionData.appointmentId //Zeigt Error Meldung in Modal Alert
            );
        },
    });
}

function showAlert(message, type, appointmentId) {
    var alertHtml = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    $(`#alertContainer${appointmentId}`).html(alertHtml).fadeIn();

    setTimeout(function () {
        $(`#alertContainer${appointmentId}`).fadeOut();
    }, 3000);
}