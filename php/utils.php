<?php

function toJson($data) {
    header('Content-Type: application/json');
    return json_encode($data);
}