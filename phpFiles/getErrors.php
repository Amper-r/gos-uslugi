<?php
    require_once __DIR__ ."/db.php";

    $session_id = $_COOKIE["session_id"];
    $query = $connect->query("SELECT * FROM `status` WHERE session_id='".$session_id."'");

    while($row = $query->fetch_assoc()){
        $data[] = $row;
    }
    
    if(isset($data)){
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    else{
        header('HTTP/1.1 404 Not found', true, 404);
        die();
    }
?>