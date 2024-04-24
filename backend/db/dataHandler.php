<?php
require_once("models/appointment.php");
require_once("models/date_options.php");
require_once("models/votes.php");


class DataHandler
{
    
    public function getDateOptionsByAppointmentID($appointment_id)
    {
        return getDateOptionsByAppointmentID($appointment_id);
    }

    public function saveDateOptionToDb($appointment_id, $date_time)
    {
        $d = new DateOptions($appointment_id, $date_time);
        return $d -> save_date_options_to_db();
    }
    
    public function saveAppointmentToDb($title, $location, $date, $voting_deadline)
    {
        $a = new Appointment($title, $location, $date, $voting_deadline);
        return $a -> save_appointment_to_db();
    }

    public function delete_appointmentByID($appointment_id)
    {
        return delete_appointmentByID($appointment_id);
    }
    
    public function infoAppointment($id)
    {
        return get_appointmentByID($id);
    }

    public function queryDateOptionByID($id)
    {
        return getDateOptions($id);
    }

    public function queryAppointments()
    {   
        return get_appointments();
    }

    public function insertDateOptions($param)
    {
        saveVoteData($param);
    }

    public function getDemoData()
    {
         $res =  $this->loadDemoData();
         return $res;
    }

    public function saveDemoDataToDB()
    {
         $res =  $this->loadDemoData();
         foreach ($res as &$appointment) {
             $appointment->save_appointment_to_db();
         }
    }

    private static function loadDemoData()
    {
         // Test data for Appointment class
         $demodata = [
            new Appointment("Team Meeting", "Office Conference Room", "2022-11-15", "2022-11-10 12:00:00"),
            new Appointment("Project Presentation", "Client's Office", "2022-10-20", "2022-10-15 12:00:00"), 
            new Appointment("Lunch with CEO", "Restaurant", "2022-09-25", "2022-09-20 10:00:00"),
            new Appointment("Training Workshop", "Online", "2022-08-05", "2022-08-01 12:00:00"),
            new Appointment("Work Anniversary Celebration", "Office Pantry", "2022-07-10", "2022-07-05 12:00:00"),
         ];
         return $demodata;
    }
}
