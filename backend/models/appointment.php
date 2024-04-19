<?php
include("db/db.php");


class Appointment { 

    private number $appointment_id; 
    private string $title; 
    private string $location; 
    private string $date; 
    private string $voting_deadline; 

    var $db;

    function __construct($title, $location, $date, $voting_deadline) { 
        $this->title = $title; 
        $this->location = $location; 
        //$this->date =  date('Y-m-d', strtotime($date));
        $this->date =  $date;
        $this->voting_deadline = $voting_deadline;
        $this->db = new DB();
    }

    function save_appointment_to_db()
    {
        $this->db -> getDbConnection();

        $sql = "INSERT INTO appointments(
            title,
            location,
            date,
            voting_deadline
		) VALUES(?,?,?,?)";

        if (!$r = $this->stmt = $this->db->prepare($sql)) {
            return $r;
        }
        $this->stmt->bind_param("ssss", $this->title, $this->location, $this->date, $this->voting_deadline);

        return $this->db->insertRecord($this->stmt);
        
    }

    function toString() {
        return "Appointment ID: " + $this->appointment_id + "\nTitle: " + $this->title + "\nLocation: " + $this-> location + "\nDate: " + $this-> date + "\nVoting Deadline: " + $this->voting_deadline; 
    }
}

function get_appointmentByID($id)
{
    $db = new DB();
    $db -> getDbConnection();

    $query = "SELECT * FROM appointments WHERE appointment_id = ?";

    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $id);

    $r = $db->getSingleRecord($stmt);

    $db->closedb();
    if ($r)
        return $r;
    else
        return false;
}

function get_appointments()
{
    $db = new DB();
    $db -> getDbConnection();

    if ($db != null) {
        //mysqli_report (MYSQLI_REPORT_OFF);
        $db-> driver -> report_mode = MYSQLI_REPORT_ERROR;
        //$query = "SELECT * FROM appointments FORCE INDEX (PRIMARY) ORDER BY ID";
        $query =  "SELECT appointment_id, title, location, date, voting_deadline FROM appointments WHERE 1";

        $r = $db->getObjectArray($query);
        //$r = "";
        //$r->bind_result($uid, $uname, $upass, $umail);
        $db-> driver -> report_mode = MYSQLI_REPORT_ALL;
        $db->closedb();
        return $r;
    }
}