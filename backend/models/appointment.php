<?php
include ("db/db.php");


class Appointment
{

    private int $appointment_id;
    private string $title;
    private string $location;
    private string $date;
    private string $voting_deadline;

    var $db;

    function __construct($title, $location, $date, $voting_deadline)
    {
        $this->title = $title;
        $this->location = $location;
        //$this->date =  date('Y-m-d', strtotime($date));
        $this->date = $date;
        $this->voting_deadline = $voting_deadline;
        $this->db = new DB();
    }

    function save_appointment_to_db()
    {
        $this->db->getDbConnection();

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

        $this->db->insertRecord($this->stmt);

        return array('inserted_id' => $this->db->inserted_id);
        
        
    }

    function toString()
    {
        return "Appointment ID: " + $this->appointment_id + "\nTitle: " + $this->title + "\nLocation: " + $this->location + "\nDate: " + $this->date + "\nVoting Deadline: " + $this->voting_deadline;
    }
}

function get_appointmentByID($id)
{
    $db = new DB();
    $db->getDbConnection();

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
    $db->getDbConnection();

    if ($db != null) {
        //mysqli_report (MYSQLI_REPORT_OFF);
        $db->driver->report_mode = MYSQLI_REPORT_ERROR;
        //$query = "SELECT * FROM appointments FORCE INDEX (PRIMARY) ORDER BY ID";
        $query = "SELECT * FROM appointments;";

        $r = $db->getObjectArray($query);
        //$r = "";
        //$r->bind_result($uid, $uname, $upass, $umail);
        $db->driver->report_mode = MYSQLI_REPORT_ALL;
        $db->closedb();
        return $r;
    }
}

function getDateOptions($id)
{
    $db = new DB();
    $conn = $db->getDbConnection();

    $query = "SELECT date_time FROM date_options WHERE appointment_id = ?;";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        error_log("MySQL prepare failed: " . $conn->error);
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }

    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
        throw new Exception("Execution failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $dateOptions = [];
    while ($row = $result->fetch_assoc()) {
        $dateOptions[] = $row['date_time'];
    }
    $stmt->close();

    return $dateOptions;
}

function saveVoteData($data) {

    // Extrahiere die notwendigen Daten aus dem übergebenen Array
    $appointmentId = $data['appointmentId'];
    $option_id = $data['option_id'];
    $username = $data['username'];
    $comment = $data['comment'];
    $availability = $data['availability'];

    $db = new DB();
    $conn = $db->getDbConnection();

    $stmt = $conn->prepare("INSERT INTO votes (appointment_id, option_id, username, availability, comment) VALUES (?, ?, ?, ?, ?)");

    $availabilityInt = $availability ? 1 : 0;

    $stmt->bind_param("iisis", $appointmentId, $option_id, $username, $availabilityInt, $comment);
    $stmt->execute();

    // Schließen Sie die Anweisung und Verbindung
    $stmt->close();
    $conn->close();
}
