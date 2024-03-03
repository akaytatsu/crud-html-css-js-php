<?php

include 'headers.php';
include 'database.php';
include 'utils.php';

$id = $_POST['id'];

if (empty($id)) {
    // 400
    http_response_code(400);
    echo toJson(['error' => 'Id is required']);
    exit;
}

$statement = $pdo->prepare("DELETE FROM todo WHERE id = :id");

$statement->bindValue(':id', $id);

$statement->execute();

// 200
http_response_code(200);
echo toJson(['message' => 'Todo deleted']);