<?php
     require_once __DIR__ ."/db.php";
     require_once __DIR__ ."/addStatus.php";
     require_once __DIR__ ."/xml.php";

    $url = trim($_POST["resurs_input"]);
    $has_electronic_view = $_POST["has_electronic_view"];
    $resp = @file_get_contents($url);
    $resp = @json_decode($resp, true);
    $data = array();

    $json_container = "ulist";

    if($resp != null){
        if(isset($resp[$json_container])){
            if($has_electronic_view == 1 || $has_electronic_view == 0){
                foreach ($resp[$json_container] as $value) {
                    if($value["has_electronic_view"] == $has_electronic_view){
                        $data[] = $value;
                    }
                }
            }
            else{
                $data = $resp[$json_container];
            }
            saveXmlFile($connect, "../xmlFiles/", $data);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
        }
        else{
            addStatus("error", $connect, "Контейнер ".$json_container." не найден");
        }
    }
    else{
        addStatus("error", $connect, "По адрессу ".$url." ничего не найдено");
    }
?>