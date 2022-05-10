<?php
    function addStatus($status, $dbconnect, $info, $redirect = null){
        $session_id = $_COOKIE["session_id"];
        $date = date('Y-m-d H:i:s');
        $query =  $dbconnect->query("INSERT INTO `status` (`id`, `session_id`, `status`, `info`, `date_time`) VALUES (NULL, '".$session_id."', '".$status."', '".$info."', '".$date."');");

        header('HTTP/1.1 404 Not found', true, 404);
        if(isset($redirect)){
            header("Location: ".$redirect);
        }
        echo json_encode(["message" => $info], JSON_UNESCAPED_UNICODE);
        die();
    }
?>