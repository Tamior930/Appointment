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

function loadAppointments() {
    let searchterm = '';
    
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


