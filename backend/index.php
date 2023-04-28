<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

$q = $_GET['q'];
$method = $_SERVER['REQUEST_METHOD'];

if($q === 'callme' && $method === 'POST'){
  $name = $_POST['name'];
  $phone = $_POST['phone'];

  if(((isset($name) && strlen(trim($name)) > 50) || (isset($phone) && strlen(trim($phone)) > 20))
    || (isset($phone) && strlen(trim($phone)) == 0)){
    echo json_encode('fail');
    return;
  }

  $data = $name.' '.$phone."\n";
  $res = file_put_contents('contacts.txt', $data, FILE_APPEND);
  if($res){
    echo json_encode('success');
  } else {
    http_response_code(500);
    echo json_encode('fail');
  }
} else {
  http_response_code(404);
  echo json_encode('fail');
}