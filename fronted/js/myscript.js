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