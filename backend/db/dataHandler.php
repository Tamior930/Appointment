<?php
include("models/appointment.php");


class DataHandler
{
    // public function infoAppointment($id)
    // {
    //     return get_appointmentByID($id);
    // }

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

    // public function queryPersonById($id)
    // {
    //     $result = array();
    //     foreach ($this->queryPersons() as $val) {
    //         if ($val[0]->id == $id) {
    //             array_push($result, $val);
    //         }
    //     }
    //     return $result;
    // }

    // public function queryPersonByName($name)
    // {
    //     $result = array();
    //     foreach ($this->queryPersons() as $val) {
    //         if ($val[0]->lastname == $name) {
    //             array_push($result, $val);
    //         }
    //     }
    //     return $result;
    // }

    // public function getDemoData()
    // {
    //     $res =  $this->loadDemoData();
    //     return $res;
    // }

    // public function saveDemoDataToDB()
    // {
    //     $res =  $this->loadDemoData();
    //     foreach ($res as &$appointment) {
    //         $appointment->save_appointment_to_db();
    //     }
    // }

    // private static function loadDemoData()
    // {
    //     // Test data for Appointment class
    //     $demodata = [
    //         new Appointment("Team Meeting", "Office Conference Room", "2022-11-15 10:00:00", "2022-11-10 12:00:00"),
    //         new Appointment("Project Presentation", "Client's Office", "2022-10-20 14:30:00", "2022-10-15 12:00:00"),
    //         new Appointment("Lunch with CEO", "Restaurant", "2022-09-25 12:30:00", "2022-09-20 10:00:00"),
    //         new Appointment("Training Workshop", "Online", "2022-08-05 09:00:00", "2022-08-01 12:00:00"),
    //         new Appointment("Work Anniversary Celebration", "Office Pantry", "2022-07-10 15:00:00", "2022-07-05 12:00:00"),
    //     ];
    //     return $demodata;
    // }
}
