<?php

$pdo = new PDO('sqlite:'.__DIR__.'/../nombres.db');

$sql_create = "CREATE TABLE IF NOT EXISTS nombres('name' TEXT, 'sexo' TEXT, 'details' TEXT, PRIMARY KEY('name'))";
$pdo->exec($sql_create);

function insert($nombre, $sexo, $details=''){
    global $pdo;
    $sql_insert = "INSERT INTO nombres('name', 'sexo', 'details') VALUES(:name, :sexo, :details)";
    $statement = $pdo->prepare($sql_insert);
    $resp = $statement->execute([
        ':name' => $nombre,
        ':sexo' => $sexo,
        ':details' => $details
    ]);

    return $resp;
}