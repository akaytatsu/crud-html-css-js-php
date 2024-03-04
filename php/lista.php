<?php

include 'headers.php';
include 'database.php';
include 'utils.php';

$statement = $pdo->query('SELECT * FROM todo ORDER BY id DESC');

$todos = $statement->fetchAll(PDO::FETCH_ASSOC);

// 200
http_response_code(200);
echo toJson($todos);