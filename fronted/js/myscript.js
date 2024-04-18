//Starting point for JQuery init
$(document).ready(function () {
    /*
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });
    */
    loaddata('');
});

function loaddata(searchterm) {
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: { method: "queryAppointment", param: searchterm },
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
