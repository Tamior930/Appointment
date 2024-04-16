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
        data: {method: "queryAppointment", param: searchterm},
        dataType: "json",
        success: function (response) {
            console.log(response);

        },
        error: function (response) {
            console.log(response);
        }
        
    });
}
