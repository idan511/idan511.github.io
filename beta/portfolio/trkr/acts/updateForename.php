<?php
	session_start(); 

	require 'con.php';

	$sql = "UPDATE `TRKR`.`USERS` SET `forename` = '$_GET[fn]' WHERE `users`.`ID` = '$_SESSION[user]';";

	if ($conn->query($sql) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $conn->error;
	}

	$conn->close();
?>