<?php

    //header('Access-Control-Allow-Origin': '*');
    // data comes fine
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $internalErrors = libxml_use_internal_errors(true);
    $words = explode(" ", $_REQUEST['words']);
    //echo "len: ".sizeof($words);
    $url = "https://www.google.com/search?tbm=isch&q=";
    $url2 = $url.$words[0];
    for($i = 1; $i < sizeof($words); $i++){
        $url2 .= '+'.$words[$i];
    }
    $html = file_get_contents($url2);
    $dom = new DOMDocument;
    $dom->loadHTML(utf8_encode($html));
    $images = $dom->getElementsByTagName('img');
    $imgs = array();
    foreach ($images as $image) {
        array_push($imgs, $image->getAttribute('src'));
    }

    echo json_encode($imgs);
?>
