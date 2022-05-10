<?php
    require_once __DIR__ ."/phpFiles/addStatus.php";
    require_once __DIR__ ."/phpFiles/db.php";

    $get_id = $_GET["id"];
    $url = $_GET["url"]."/?option=com_uslugi&view=usluga&task=getUsluga&uslugaId=".$get_id;

    $resp = @file_get_contents($url);
    $resp = @json_decode($resp, true);
    if($resp != null){
        $id = $resp["id"];
        $name = $resp["name"];
        $org = $resp["organization"];
        $has_electronic_view = $resp["description"]["has_electronic_view"];
        $payment_amount = $resp["description"]["payment"]["payment_amount"];
        $category =  $resp["category"];
    }
    else{
        addStatus("error", $connect, "По адрессу ".$url." ничего не найдено", "404.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/viewUsluga.min.css">
    <title>Usluga - Подробно</title>
</head>
<body>
    <div class="content">
        <a href="index.php" class="btn-back">Главная</a>
        <span class="id">ID: <?php echo $id; ?></span>
        <h1 class="name"><?php echo $name; ?></h1>
        <div class="section">
            <span class="title">Организация: </span>
            <span class="value"><?php echo $org; ?></span>
        </div>
        <div class="section">
            <span class="title">Категория: </span>
            <span class="value"><?php echo $category; ?></span>
        </div>
        <div class="section">
            <span class="title">has_electronic_view: </span>
            <span class="value"><?php echo $has_electronic_view; ?></span>
        </div>
        <div class="section">
            <span class="title">Оплата: </span>
            <span class="value"><?php echo ($payment_amount) ? $payment_amount : "-"; ?></span>
        </div>
    </div>
</body>
</html>
