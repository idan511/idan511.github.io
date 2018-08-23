<?php
	$servername = "localhost";
	$username = "gayguy";
	$password = "Q3zwjpjb36NR7yfj";

	// Create connection
	$conn = new mysqli($servername, $username, $password);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
?>