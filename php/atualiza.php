<?php

include 'headers.php';
include 'database.php';
include 'utils.php';

$id = $_POST['id'];
$title = $_POST['title'];

if (empty($id) || empty($title)) {
    // 400
    http_response_code(400);
    echo toJson(['error' => 'Id and title are required']);
    exit;
}

$statement = $pdo->prepare("UPDATE todo SET title = :title WHERE id = :id");

$statement->bindValue(':id', $id);

$statement->bindValue(':title', $title);

$statement->execute();

// 200

http_response_code(200);
echo toJson(['message' => 'Todo updated']);