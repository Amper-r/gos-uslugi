<?php
    require_once __DIR__ ."/db.php";

    // checkSession($connect);
    CreateSession($connect);

    function CreateSession($dbconnect){
        $data = 0;
        while(isset($data)){
            $value = md5(mt_rand(0, 1000000));
            $query =  $dbconnect->query("SELECT * FROM `status` WHERE session_id='".$value."'");
            $data = $query->fetch_assoc();
        }
        setcookie("session_id", $value, 0, "/");
    }

    // function checkSession($dbconnect){
    //     $session_time = 2; // min

    //     if($_COOKIE["session_time"] + $session_time * 60 < time() || !isset($_COOKIE["session_id"])){
    //         CreateSession($dbconnect);
    //         setcookie("session_time", time(), 0, "/");
    //         echo  json_encode(["message" => "1"], JSON_UNESCAPED_UNICODE);
    //     }
    //     else{
    //         echo  json_encode(["message" => "0"], JSON_UNESCAPED_UNICODE);
    //     }
    // }
?>