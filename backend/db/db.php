<?php
function getDbConnection() {
    $host = 'localhost';
    $user = 'bif2webscriptinguser';
    $pass = 'bif2021';
    $db = 'appointment_finder';

    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}
