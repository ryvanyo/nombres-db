<?php
$opt = getopt('', ['input:']);

if (empty($opt['input'])) {
    echo "\nSe necesita el parametro --input \"archivo.csv\"\n";
    exit();
}

$filepath = $opt['input'];
if (!is_file($filepath)) {
    echo "\n".$filepath." no existe\n";
    exit();
}

$fp = fopen($opt['input'], "r");
if ($fp===false) {
    echo "\nNo se pudo abrir el archivo ".$opt['input']."\n";
    exit();
}

require_once __DIR__."/db.php";

$conta = 1;
while(!feof($fp)) {
    $linea = fgets($fp);
    $data = explode(",", $linea);
    $sexo = $data[1]=="F" ? 'mujer' : 'hombre';
    $nombre = $data[3];
    $insertado = insert($nombre, $sexo);
    if ($insertado) {
        echo $nombre."\t".($conta++)."\n";
    } else {
        echo "\t\t\t".$nombre." !\n";
    }
}
fclose($fp);



foreach($json as $data){
    if (!isset($data['nombre']) || !isset($data['sexo'])) continue;
    $insertado = insert($data['nombre'], $data['sexo']);
    if ($insertado) {
        echo "Insertado: ".$data['nombre']."\n";
    } else {
        echo "Error: no se pudo insertar ".$data['nombre']."\n";
    }
}