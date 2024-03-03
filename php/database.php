<?php

// pega o valor POSTGRES_DB da variavel de ambiente
$POSTGRES_DB = getenv('POSTGRES_DB');
$POSTGRES_USER = getenv('POSTGRES_USER');
$POSTGRES_PASSWORD = getenv('POSTGRES_PASSWORD');
$POSTGRES_HOST = getenv('POSTGRES_HOST');
$POSTGRES_PORT = "" . (getenv('POSTGRES_PORT'));

// cria a string de conexao
$dsn = "pgsql:dbname=$POSTGRES_DB;host=$POSTGRES_HOST;port=$POSTGRES_PORT;user=$POSTGRES_USER;password=$POSTGRES_PASSWORD";

// tenta conectar
try {
    $pdo = new PDO($dsn);
    createDatabase($pdo);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

function createDatabase($pdo) {
    $pdo->exec("CREATE TABLE IF NOT EXISTS todo (
        id serial PRIMARY KEY,
        title VARCHAR (100) NOT NULL,
        done BOOLEAN NOT NULL DEFAULT FALSE
    )");
}
