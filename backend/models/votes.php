<?php
class Vote
{
    private $vote_id;
    private $option_id;
    private $user_id;
    private $username;
    private $comment;

    public function __construct($vote_id, $option_id, $user_id, $username, $comment)
    {
        $this->vote_id = $vote_id;
        $this->option_id = $option_id;
        $this->user_id = $user_id;
        $this->username = $username;
        $this->comment = $comment;
    }
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