<?php 
class DateOptions
{

    private $option_id;
    private $appointment_id;
    private $date_time;

    var $db;

    function __construct($appointment_id, $date_time)
    {
        $this->appointment_id = $appointment_id;
        $this->date_time = $date_time;
        $this->db = new DB();
    }

    function save_date_options_to_db()
    {
        $this->db -> getDbConnection();

        $sql = "INSERT INTO date_options(
            appointment_id,
            date_time
        ) VALUES(?,?)";

        if (!$r = $this->stmt = $this->db->prepare($sql)) {
            return $r;
        }
        $this->stmt->bind_param("is", $this->appointment_id, $this->date_time);

        return $this->db->insertRecord($this->stmt);

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

