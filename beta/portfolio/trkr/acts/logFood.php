<?php
	session_start(); 

	require 'con.php';

	$date = new DateTime();
	$date->setTime($_GET["th"], $_GET["tm"]);
	$d =  $date->format('Y-m-d H:i:s');
	
	$sql = "INSERT INTO `TRKR`.`INPUT` (`user`, `time`, `type`, `cal`) VALUES ('$_SESSION[user]', '$d', '$_GET[f]', '$_GET[c]');";

	if ($conn->query($sql) === TRUE) {
	    
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
?>