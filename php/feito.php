<?php

use function PHPSTORM_META\type;

include 'headers.php';
include 'database.php';
include 'utils.php';

$id = $_POST['id'];

if (empty($id)){
    // 400
    http_response_code(400);
    echo toJson(['error' => 'ID is required']);
    exit;
}

// faz uma query que inverte o valor de done
$statement = $pdo->prepare("UPDATE todo SET done = NOT done WHERE id = :id");

$statement->bindValue(':id', $id);

$statement->execute();

// 201
http_response_code(201);
echo toJson(['message' => 'Todo updated']);
