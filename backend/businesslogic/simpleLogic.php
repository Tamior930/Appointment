<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param, $title, $location, $date, $voting_deadline, $appointment_id, $date_time)
    {
        switch ($method) {
            case "infoAppointment":
                $res = $this->dh->infoAppointment($param);
                break;
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;        
            case "saveAppointmentToDb":
                $res = $this->dh->saveAppointmentToDb($title, $location, $date, $voting_deadline);
                break;
            case "saveDateOptionToDb":
                $res = $this->dh->saveDateOptionToDb($appointment_id, $date_time);
                break;
            case "getDemoData":
                $res = $this->dh->loadDemoData();
                break;
            case "saveDemoDataToDB":
                $res = $this->dh->saveDemoDataToDB();
                break;  
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
