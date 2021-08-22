<?php
$opt = getopt('', ['input:']);

if (empty($opt['input'])) {
    echo "\nSe necesita el parametro --input \"archivo.json\"\n";
    echo 'En el archivo input debe tener: [{"nombre" : "Luis", "sexo": "hombre"}, ...]'."\n";
    exit();
}

$filepath = $opt['input'];
if (!is_file($filepath)) {
    echo "\n".$filepath." no existe\n";
    exit();
}

$filecontent = file_get_contents($filepath);
$json = json_decode($filecontent, true);
if (empty($json) || !is_array($json)) {
    echo "\n$filepath no contiene un arreglo json: [{\"nombre\":\"juan\", \"sexo\":\"hombre\"}, ...]\n";
    exit();
}

require_once __DIR__."/db.php";

foreach($json as $data){
    if (!isset($data['nombre']) || !isset($data['sexo'])) continue;
    $insertado = insert($data['nombre'], $data['sexo']);
    if ($insertado) {
        echo "Insertado: ".$data['nombre']."\n";
    } else {
        echo "Error: no se pudo insertar ".$data['nombre']."\n";
    }
}