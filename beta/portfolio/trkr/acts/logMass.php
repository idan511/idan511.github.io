<?php
	session_start(); 

	require 'con.php';

	$sql = "INSERT INTO `TRKR`.`MASS` (`user`, `mass`) VALUES ('$_SESSION[user]', '$_GET[m]');";

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
?>