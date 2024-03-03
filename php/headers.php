<?php

// Permitir acesso de qualquer origem
header('Access-Control-Allow-Origin: *');

// Para permitir apenas solicitações de um domínio específico
// header('Access-Control-Allow-Origin: https://example.com');

// Outros cabeçalhos CORS que você pode precisar
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
