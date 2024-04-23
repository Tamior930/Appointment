<?php
include ("businesslogic/simpleLogic.php");

$param = "";
$method = "";
$appointment_id = "";
$date_time = "";
$title = "";
$location = "";
$date = "";
$voting_deadline = "";

isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;
isset($_GET["appointment_id"]) ? $appointment_id = $_GET["appointment_id"] : false;
isset($_GET["date_time"]) ? $date_time = $_GET["date_time"] : false;
isset($_GET["title"]) ? $title = $_GET["title"] : false;
isset($_GET["location"]) ? $location = $_GET["location"] : false;
isset($_GET["date"]) ? $date = $_GET["date"] : false;
isset($_GET["voting_deadline"]) ? $voting_deadline = $_GET["voting_deadline"] : false;

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param, $title, $location, $date, $voting_deadline, $appointment_id, $date_time);
if ($result == null) {
    response("GET", 400, null);
} else {
    response("GET", 200, $result);
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
