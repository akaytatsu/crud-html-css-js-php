<?php

include 'database.php';
include 'utils.php';

$title = $_POST['title'];

if (empty($title)) {
    // 400
    http_response_code(400);
    echo toJson(['error' => 'Title is required']);
    exit;
}

$statement = $pdo->prepare("INSERT INTO todo (title) VALUES (:title)");

$statement->bindValue(':title', $title);

$statement->execute();

// 201
http_response_code(201);
echo toJson(['message' => 'Todo created']);