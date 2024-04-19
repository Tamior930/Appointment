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
   loadAppointments()

   $('#navTabs a').click(function (e) {
        e.preventDefault();
        
        var href = this.hash;
        $('.active').removeClass('active');
        $(href).addClass('active');
        $(this).addClass('active');
    });

    //Get form element
    var form=document.getElementById("form_poll_1");
    function submitForm(event){

    //Preventing page refresh
    event.preventDefault();
    
    $.ajax({
        type: "GET",
        url: "addAppointment2.html",
        data: { },
        success: function(data){
            $('#tab_add').html(data);
        }
    });

    }

    //Calling a function during form submission.
    form.addEventListener('submit', submitForm);
});

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
    let searchterm = '';
    
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointments", param: searchterm},
        dataType: "json",
        success: function (response) {
            console.log("Daten geladen: ", response);
            displayAppointments(response);
        },
        error: function (response) {
            console.error("Fehler beim Laden der Daten: ", response);
        }
    });
}


function displayAppointments(appointments) {
    const container = $("#appointmentsList");
    container.empty();

    appointments.forEach(appointment => {
        const Card = `
            <div class="card mb-3">
                <div class="card-header">${appointment[0].getTitle()}</div>
                <div class="card-body">
                    <h5 class="card-title">${appointment[0].location}</h5>
                    <p class="card-text">Start: ${appointment[0].date}</p>
                    <p class="card-text">End: ${appointment[0].voting_deadline}</p>
                </div>
            </div>
        `;
        container.append(Card);
    });
}
