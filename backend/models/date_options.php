<?php class DateOptions
{

    private $option_id;
    private $appointment_id;
    private $date_time;

    function __construct($option_id, $appointment_id, $date_time)
    {
        $this->option_id = $option_id;
        $this->appointment_id = $appointment_id;
        $this->date_time = $date_time;
    }

}