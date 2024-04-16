<?php
class Appointment { 

    private $appointment_id; 
    private $title; 
    private $location; 
    private $date; 
    private $voting_deadline; 

    function __construct($title, $location, $date, $voting_deadline) { 
        $this->title = $title; 
        $this->location = $location; 
        $this->date = $date; 
        $this->voting_deadline = $voting_deadline; 
    }
}