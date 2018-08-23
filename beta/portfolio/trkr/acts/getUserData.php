<?php
	session_start(); 

	require 'con.php';

	$sql = "SELECT * FROM `TRKR`.`USERS` WHERE `ID`=$_SESSION[user]";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
			$result2 = $conn->query("SELECT * FROM `TRKR`.`MASS` WHERE `user`=$_SESSION[user] ORDER BY `time` ASC");
			if ($result2->num_rows > 1) {
	    		while($roww = $result2->fetch_assoc()) {
	    			$mass[] = array(
	    				"time" => strtotime($roww["time"]),
	    				"mass" => $roww["mass"]
	    			);
	    		}
	    	} else {
	    		$mass = "empty";
	    	}

	    	$result3 = $conn->query("SELECT DATE(`HEIGHT`.`time`) as `date`, MAX(`HEIGHT`.`height`) AS `maxHeight` FROM `TRKR`.`HEIGHT` WHERE `HEIGHT`.`user`=$_SESSION[user] GROUP BY `date`");
			if ($result3->num_rows > 0) {
	    		while($romm = $result3->fetch_assoc()) {
	    			$height[] = array(
	    				"height" => $romm["maxHeight"],
	    				"date"   => $romm["date"]
	    			);
	    		}
	    	} else {
	    		$height = "empty";
	    	}

	    	$result3 = $conn->query("SELECT DATE(`INPUT`.`time`) AS `date`, SUM(`INPUT`.`cal`) AS `sumCal` FROM `TRKR`.`INPUT` WHERE `INPUT`.`user`=$_SESSION[user] GROUP BY `date`");
			if ($result3->num_rows > 0) {
	    		while($romm = $result3->fetch_assoc()) {
	    			$cal[$romm["date"]] = $romm["sumCal"];
	    		}
	    	} else {
	    		$cal = "empty";
	    	}

	    	$result3 = $conn->query("SELECT DATE(`ACTIVITY`.`time`) AS `date`, SUM(`ACTIVITY`.`cal`) AS `sumAct` FROM `TRKR`.`ACTIVITY` WHERE `ACTIVITY`.`user`=$_SESSION[user] GROUP BY `date`");
			if ($result3->num_rows > 0) {
	    		while($romm = $result3->fetch_assoc()) {
	    			$act[$romm["date"]] = $romm["sumAct"];
	    		}
	    	} else {
	    		$act = "empty";
	    	}

	    	$result3 = $conn->query("SELECT DATE(`MASS`.`time`) as `date`, MIN(`MASS`.`mass`) AS `minMass` FROM `TRKR`.`MASS` WHERE `MASS`.`user`=$_SESSION[user] GROUP BY `date`");
			if ($result3->num_rows > 1) {
				$i=0;
	    		while($romm = $result3->fetch_assoc()) {
	    			if(isset($height[$i+1]) && strtotime($height[$i+1]["date"])-strtotime($romm["date"]) <= 0) {
	    				$i++;
	    			}
	    			$master[] = array(
	    				"date" 		 => $romm["date"],
	    				"mass" 		 => $romm["minMass"],
	    				"height" 	 => $height[$i]["height"],
	    				"input" 	 => (isset($cal[$romm["date"]]) ? $cal[$romm["date"]] : 0),
	    				"activity" 	 =>	(isset($act[$romm["date"]]) ? $act[$romm["date"]] : 0)
	    			);
	    		}
	    	} else {
	    		$master = "empty";
	    	}

	        $arr = array(
	        	"status" => "ok",
                "first_name" => $row["forename"],
                "last_name" => $row["surname"],
                "email" => $row["email"],
                "bday" => $row["birthday"],
                "goalBMI" => $row["goal BMI"],
				"progLength" => $row["program length"],
				"mass" => $mass,
				"master" => $master
        	);
	    }
	} else {
	    $arr = array(
	    	"status" => "shit",
	    	"why" => "no user found"
	    );
	}
	$arr["date"] = date("Y-m-d");
	echo json_encode($arr);
	/*echo '<pre>';
	print_r($arr);
	echo '</pre>';*/
	$conn->close();
?>