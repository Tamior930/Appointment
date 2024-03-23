<?php
include("/backend/db/db.php");

function getAllAppointments() {
    $stmt = $conn->query("SELECT * FROM appointments");
    return $stmt->fetchAll();
}

