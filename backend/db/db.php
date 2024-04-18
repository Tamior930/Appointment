<?php
class DB {
    var $inserted_id;
    var $conn;
    var $result;

    var $driver;

    function __construct(){
        $this -> conn = $this -> getDbConnection();
    }

    function getDbConnection() {
        /* Fehlermeldungen aktivieren */
		$this->driver = new mysqli_driver();
		$this->driver->report_mode = MYSQLI_REPORT_ALL;

        $host = 'localhost';
        $user = 'bif2webscriptinguser';
        $pass = 'bif2021';
        $db = 'appointment_finder';
    
        $this -> conn = new mysqli($host, $user, $pass, $db);
    
        if ($this -> conn->connect_error) {
            die("Connection failed: " . $this -> conn->connect_error);
        }
    
        return $this -> conn;
    }

    function prepare($query)
	{
		return $this->conn->prepare($query);
	}

    function insertRecord($stmt): bool
	{
		try {
			$this->result = $stmt->execute();
		} catch (mysqli_sql_exception $e) {
			echo "catch: " . $e->__toString();
			echo "code: " . $e->getCode();
			echo "msg: " . $e->getMessage();

			$this->error = $e->getMessage();
			$this->error_code = $e->getCode();

			return false;

		}
		//$this->result = $stmt->get_result();
		$this->inserted_id = $stmt->insert_id;
        
        $this-> closedb();
		return $this->result;
	}


	function getObjectArray($query): array
	{
		$objectArray = [];
		$i = 0;

		$result = $this->conn-> query($query);
        
        while ($obj = $result->fetch_object()) {
            //printf("%s (%s)\n", $obj->Name, $obj->CountryCode);
            $objectArray[$i] = $obj;
            $i++;
        }
        //$this->connection->close();

		return $objectArray;
	}

	function closedb() {
		$this->conn->close();
	}
}

