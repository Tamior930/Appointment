<?php
include("models/appointment.php");


class DataHandler
{
    public function queryAppointment()
    {
        $res =  $this->getDemoData();
        
        $a = new Appointment("title", "location", "1000-01-01", "2020-01-01 00:00:00");
        $a->save_appointment_to_db();
        return $res;
    }

    public function queryAppointments()
    {   
        $a = new Appointment("title", "location", "1000-01-01", "2020-01-01 00:00:00");
        $a->save_appointment_to_db();
        return get_appointments();
    }

    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->lastname == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function loadDemoData()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    private static function getDemoData()
    {
        /*
        $demodata = [
            [new Person(1, "Jane", "Doe", "jane.doe@fhtw.at", 1234567, "Central IT")],
            [new Person(2, "John", "Doe", "john.doe@fhtw.at", 34345654, "Help Desk")],
            [new Person(3, "baby", "Doe", "baby.doe@fhtw.at", 54545455, "Management")],
            [new Person(4, "Mike", "Smith", "mike.smith@fhtw.at", 343477778, "Faculty")],
        ];
        return $demodata;
        */
        // Test data for Appointment class
        $appointment1 = new Appointment("Team Meeting", "Office Conference Room", "2022-11-15", "2022-11-10 12:00:00"); 
        $appointment2 = new Appointment("Project Presentation", "Client's Office", "2022-10-20", "2022-10-15 12:00:00"); 
        $appointment3 = new Appointment("Lunch with CEO", "Restaurant", "2022-09-25", "2022-09-20 10:00:00"); 
        $appointment4 = new Appointment("Training Workshop", "Online", "2022-08-05", "2022-08-01 12:00:00"); 
        $appointment5 = new Appointment("Work Anniversary Celebration", "Office Pantry", "2022-07-10", "2022-07-05 12:00:00");

        $demodata = [
            [$appointment1],
            [$appointment2],
            [$appointment3],
            [$appointment4],
            [$appointment5],
        ];
        return $demodata;

        //echo "Test data created successfully for Appointments.";
    }
}
