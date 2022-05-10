<?php
    function Xml($array, $xml = false){

        if($xml === false){
            $date = date('Y-m-d H:i:s');
            $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><result DateTime="'.$date.'"></result>');
        }
        
        foreach($array as $key => $value){
            if(is_array($value)){
                if(is_numeric($key)){
                    $key = "usluga";
                }
                Xml($value, $xml->addChild($key));
            } else {
                $xml->addChild($key, $value);
            }
        }

        return $xml;
    }

    function saveXmlFile($dbconnect, $path, $array, $xml = false){
        $_xml = Xml($array, $xml);

        $dom = dom_import_simplexml($_xml)->ownerDocument;
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;
        $dom->saveXML();
        $name = getNameFile($path);
        $dom->save($path."".$name);

        $date = date('Y-m-d H:i:s');
        $session_id = $_COOKIE["session_id"];
        $query = $dbconnect->query("INSERT INTO `xml_files` (`id`, `session_id`, `file_name`, `date_time`) VALUES (NULL, '".$session_id."', '".$name."', '".$date."');");
    }

    function getNameFile($path){
        $name = md5(mt_rand(0, 1000000)).'.'."xml";
        while (file_exists($path."".$name) ) $name = md5(mt_rand(0, 1000000)) . '.xml';
        return $name;
    }
?>