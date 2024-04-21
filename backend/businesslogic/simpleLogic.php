<?php
include ("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            // case "infoAppointment":
            //     $res = $this->dh->infoAppointment($param);
            //     break;
            case "queryDateOptionByID":
                $res = $this->dh->queryDateOptionByID($param);
                break;
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            // case "queryPersonById":
            //     $res = $this->dh->queryPersonById($param);
            //     break;
            // case "queryPersonByName":
            //     $res = $this->dh->queryPersonByName($param);
            //     break;
            // case "getDemoData":
            //     $res = $this->dh->loadDemoData();
            //     break;
            // case "saveDemoDataToDB":
            //     $res = $this->dh->saveDemoDataToDB();
            //     break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
