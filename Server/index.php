<?php

//Receive POST data from login form
/*header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//http_response_code(200);

$data = (array) json_decode(file_get_contents('php://input'), TRUE);

//$result=array( "status"=>$data);

//echo json_encode($data)


//Get UserName + Password from file
$dir = dirname(dirname(__DIR__));
$fileName = $dir."/ARB/login.json";

//$array[0] == username; $array[1] == password
//$config = explode("\n", file_get_contents($fileName));
$config = (array) json_decode(file_get_contents($fileName), TRUE); 
//echo $array[0]."-".$array[1];
http_response_code(200);
//$result=array( "post"=>$data, "stored"=>$config);
//echo json_encode($result)
try {
	if(($config["username"]==$data["username"]) and ($config["password"]==$data["password"])) {		
		echo '{';
			echo '"status": "0"';//success
		echo '}';
	}
	else{
		echo '{';
			echo '"status": "-1"';//fail
		echo '}';
	}
} catch(Exception $e) {
  echo '{';
			echo '"status": "-1"';//fail
		echo '}';
}


?>
