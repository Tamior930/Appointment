<?php
class Appointment
{

    private $appointment_id;
    private $title;
    private $location;
    private $date;
    private $voting_deadline;

    function __construct($title, $location, $date, $voting_deadline)
    {
        $this->title = $title;
        $this->location = $location;
        $this->date = $date;
        $this->voting_deadline = $voting_deadline;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getLocation()
    {
        return $this->location;
    }

    // Getter for title
    public function getDate()
    {
        return $this->date;
    }

    // Setter for title
    public function getVoting()
    {
        return $this->voting_deadline;
    }
}