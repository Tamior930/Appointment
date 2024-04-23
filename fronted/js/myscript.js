//Starting point for JQuery init
$(document).ready(function () {
    const submitChoicesAvalaible = null;
    //For Poll 1
    let name, date, poll_title, location, description = null;
    let options = [];
    let options_amount = 5;
    let voting_deadline; 
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
        
        let href = this.hash;
        $('.active').removeClass('active');
        $(href).addClass('active');
        $(this).addClass('active');

        if ($(this).attr('id') == 'home'){
            loadAppointments();
        }
    });

    $('#goTo_step_3').click(function (e) {
        e.preventDefault();
        console.log("ok");
    });

    //Get form element
    const form=document.getElementById("form_poll_1");
    async function submitForm(event){
        name = checkAndGet(document.getElementById("name"), name);
        date = checkAndGet(document.getElementById("date"), date);
        poll_title = checkAndGet(document.getElementById("poll_title"), poll_title);
        location = checkAndGet(document.getElementById("location"), location);
        description = checkAndGet(document.getElementById("description"), description);
        //setForm1Data(name);

        //Preventing page refresh
        event.preventDefault();
        
        
        if (event.target.id == 'form_poll_1') {
            $.ajax({
                type: "GET",
                url: "addAppointment2.html",
                data: { },
                success: function(data){        
                    $('#tab_add').html(data);
                    setDateControls(options_amount, options);
                    setPoll2Buttons();
                    $('#backTo1').on('click', submitForm);
                    $('#form_poll_2').on('submit', submitForm);
                }
            });
        } else if (event.target.id == 'form_poll_2'){
            dateControls = document.querySelectorAll('input[type="text"]');
        
            if (dateControls) {
                
                let i = 0;
                dateControls.forEach(dateControl => {
                    if (dateControl.value) {
                        options[i] = dateControl.value;
                        i++;
                    }
                });
                options_amount = i;
            }
            $.ajax({
                type: "GET",
                url: "addAppointment3.html",
                data: { },
                success: function(data){        
                    $('#tab_add').html(data);
                    setPoll3Buttons();
                    $('#backTo2').on('click', submitForm);
                    $('#form_poll_3').on('submit', submitForm);
                }
            });
        } else if (event.target.id == 'form_poll_3'){
            voting_deadline = checkAndGet(document.getElementById("expiry_date"), voting_deadline);

            //newAppointment(title_param, location_param, date_param, voting_deadline_param)
            //newDateOption(appointment_id_param, date_time_param)
            let appointment_id = await newAppointment(poll_title, location, date, voting_deadline);
            console.log(appointment_id);
            options.forEach(option => {
                newDateOption(appointment_id.inserted_id, option.replace(' ', 'T'));
            });
            document.getElementById("home").click();
            
        }

        if (event.target.id == 'backTo1'){
            $.ajax({
                type: "GET",
                url: "index.html",
                data: { },
                success: function(data){  
                    $('#tab_add').html($(data).find('#tab_add'));
                    $('#form_poll_1').on('submit', submitForm);
                    $('#name').val(name);
                    $('#date').val(date);
                    $('#poll_title').val(poll_title);
                    $('#location').val(location);
                    $('#description').val(description);
                }
            });
        } else if (event.target.id == 'backTo2') {
            $.ajax({
                type: "GET",
                url: "addAppointment2.html",
                data: {},
                success: function (data) {
                    $('#tab_add').html(data);
                    setDateControls(options_amount, options);
                    setPoll2Buttons();
                    $('#backTo1').on('click', submitForm);
                    $('#form_poll_2').on('submit', submitForm);

                }
            });
        }
    }
    
    //Calling a function during form submission.
    form.addEventListener("submit", submitForm);
    function back(event){
        if ($(this).attr('id') == 'backTo1'){
            if (name){
                console.log(name);
            }
        }
    }
});

function checkAndGet(element, val) {
    if(element && !val) {
        return element.value;
    }
    return val;
}

function setDateControls(amount, options) {
    var nb_choices = amount;
    var last_choice = $('.choice-field:last');

    if (nb_choices > 0) {
        $('#choice0').val(options.find(op => op !== ""));
    } else if (nb_choices == 1) {
        return;
    }

    for (let i = 1; i < amount; i++) {
        var new_choice = last_choice.html();
        let value = options[nb_choices - i];
        if (!value && options.length > amount){
            break;
        } else if(!value) {
            value = '';
        }

        
        // label
        var last_choice_label = last_choice.children('label').text();
        var choice_text = last_choice_label.substring(0, last_choice_label.indexOf(' '));
    
        // for and id
        var re_id_choice = new RegExp('"choice' + (nb_choices - i) + '"', 'g');
    
        var new_choice_html = new_choice.replace(re_id_choice, '"choice' + (nb_choices - i ) + '"')
            .replace(last_choice_label, choice_text + ' ' + (nb_choices - i + 1))
            .replace(/value="(.*?)"/g, 'value="'+ value + '"');
    
        last_choice.after('<div class="form-group choice-field row mb-3 justify-content-center choice' + (nb_choices - i) + '_div">' + new_choice_html + '</div>');
    }

    $('#choice' + nb_choices).focus();
    $('#remove-a-choice').removeClass('disabled');
}

function loaddata(searchterm) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointments", param: searchterm},
        dataType: "json",
        success: function (response) {
            console.log(response);

        },
        error: function (response) {
            console.log(response);
        }
        
    });
}

function validateForm() {
    //this.preventDefault();

    if ($(this).attr('id') == 'form_poll_1') {
        return true;
    } else if ($(this).attr('id') == 'form_poll_2') {
        return checkChoices();
    }
    
}

function setPoll2Buttons() {
    /*
    $( "#tdate" ).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss',
            onShow: function () {
                this.setOptions({
                    minDate:$('#tdate').val()?$('#tdate').val():false,
                    minTime:$('#tdate').val()?$('#tdate').val():false
                });
            }                    
    }).attr('readonly', 'readonly');
    */

    let currentdate = new Date(); 
    const dateControls = document.querySelectorAll('input[type="text"]');
    
    dateControls.forEach(dateControl => {
        //`${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`
        //YYYY-MM-DDTHH:MM – z.B. 2022-08-16T20:45.
        //`${currentdate.getFullYear()}-${currentdate.getMonth() + 1}-${currentdate.getDate()}`
        $(dateControl).datetimepicker({
                onShow: function () {
                    this.setOptions({
                        step: 15,
                        minDate: `${currentdate.getFullYear()}-${currentdate.getMonth() + 1}-${currentdate.getDate()}`
                        //minTime: `${currentdate.getHours() + ":"  + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes()}`
                    });
                }                    
        }).attr('readonly', 'readonly');
    });

    // Button "Add a choice"
    $('#add-a-choice').on('click', function () {
        var nb_choices = $('.choice-field').length;
        var last_choice = $('.choice-field:last');

        var new_choice = last_choice.html();

        // label
        var last_choice_label = last_choice.children('label').text();
        var choice_text = last_choice_label.substring(0, last_choice_label.indexOf(' '));

        // for and id
        var re_id_choice = new RegExp('"choice' + (nb_choices - 1) + '"', 'g');

        var new_choice_html = new_choice.replace(re_id_choice, '"choice' + nb_choices + '"')
            .replace(last_choice_label, choice_text + ' ' + (nb_choices + 1))
            .replace(/value="(.*?)"/g, 'value=""');

        last_choice.after('<div class="form-group choice-field row mb-3 justify-content-center choice' + nb_choices + '_div">' + new_choice_html + '</div>');

        $('#choice' + nb_choices).focus();
        $('#remove-a-choice').removeClass('disabled');
    });

    // Button "Remove a choice"

    $('#remove-a-choice').on('click', function () {
        $('.choice-field:last').remove();
        var nb_choices = $('.choice-field').length;
        $('#choice' + (nb_choices - 1)).focus();
        if (nb_choices == 1) {
            $('#remove-a-choice').addClass('disabled');
        }
        //submitChoicesAvalaible();
    });
}

function setPoll3Buttons() {
    let currentdate = new Date(); 
    const dateControl = document.querySelectorAll('input[type="text"]');
    $(dateControl).datetimepicker({
        onShow: function () {
            this.setOptions({
                step: 15,
                minDate: `${currentdate.getFullYear()}-${currentdate.getMonth() + 1}-${currentdate.getDate()}`
                //minTime: `${currentdate.getHours() + ":"  + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes()}`
            });
        }                    
    }).attr('readonly', 'readonly');
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

function newAppointment(title_param, location_param, date_param, voting_deadline_param) {
    return $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveAppointmentToDb", title: title_param, location:location_param, date:date_param, voting_deadline:voting_deadline_param},
        dataType: "json",
        success: function (response) {
            console.log("Daten gespeichert!", response);
            return response;
        },
        error: function (response) {
            console.error("Fehler beim Speichern der Daten: ", response);
        }
    });
}

function newDateOption(appointment_id_param, date_time_param) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveDateOptionToDb", appointment_id: appointment_id_param, date_time:date_time_param},
        dataType: "json",
        success: function (response) {
            console.log("Daten gespeichert!", response);
        },
        error: function (response) {
            console.error("Fehler beim Speichern der Daten: ", response);
        }
    });
}

function newAppointment(title_param, location_param, date_param, voting_deadline_param) {
    return $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveAppointmentToDb", title: title_param, location:location_param, date:date_param, voting_deadline:voting_deadline_param},
        dataType: "json",
        success: function (response) {
            console.log("Daten gespeichert!", response);
            return response;
        },
        error: function (response) {
            console.error("Fehler beim Speichern der Daten: ", response);
        }
    });
}

function newDateOption(appointment_id_param, date_time_param) {

    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveDateOptionToDb", appointment_id: appointment_id_param, date_time:date_time_param},

        dataType: "json",
        success: function (response) {
            console.log("Daten gespeichert!", response);

        },
        error: function (response) {
            console.error("Fehler beim Speichern der Daten: ", response);
        }

    });
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
        loadDateOptions(appointmentId, async function (dateOptions) {
            const now = new Date();
            const deadline = new Date(appointment.voting_deadline);
            const isVotingOpen = now < deadline; // Prüfen, ob die Abstimmung noch offen ist

            let dateOptionsFromAppointmentID = await getDateOptionsByAppointmentID(appointmentId);

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


function getDateOptionsByAppointmentID(appointment_id) {
    return $.ajax({
        type: "GET",
        async: false,
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {
            method: "getDateOptionsByAppointmentID",
            appointment_id: appointment_id,
        },
        dataType: "json",
        success: function (dateOptions) {
            console.log("Date options loaded: ", dateOptions);
            return dateOptions;
        },
        error: function (error) {
            console.error("Error loading date options: ", error);
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