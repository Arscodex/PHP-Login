
<?php

//Set up the connection variables

$servername = 'localhost';
$username = 'dc_admin';
$password = 'dcpassword101';

//Create the connection

try{
	$conn = new PDO("mysql:host=$servername;dbname=dynamic_charts", $username, $password);
	//Set up PDO error handling
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//Set the variables for the registration as null values

	$registerUsername = $registerPassword = $registerEmail = '';

	if($_SERVER["REQUEST_METHOD"] == "GET"){
		$registerUsername = $_REQUEST['username'];
		$registerPassword = $_REQUEST['password'];
		$registerEmail = $_REQUEST['email'];
	}
	$checkUsername = filter_var($registerUsername, FILTER_SANITIZE_STRING);
	$checkPassword = filter_var($registerPassword, FILTER_SANITIZE_STRING);
	$checkEmail = filter_var($registerEmail, FILTER_SANITIZE_EMAIL);



	if(!filter_var($checkEmail, FILTER_VALIDATE_EMAIL)):
		//Check the email address
		echo 'Please enter a valid email address';
	elseif(!$checkPassword):
		//Check the password
		echo 'Please enter a valid password';
	elseif(!$checkUsername):
		//Check the username
		echo 'Please enter a valid username';
	else:
		//SQL command to create the user

		$sql = "CREATE USER '" . $registerUsername . "'@'localhost'" . "IDENTIFIED BY '" . $registerPassword . "'";
		//$sql = 'CREATE TABLE test (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT)';
		$conn->exec($sql);
		echo 'SQL success';
	endif;
}
catch(PDOEXception $e){
	//Report the error message
	echo 'Connection failed: ' . $e->getMessage();
}



?>