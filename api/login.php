<?php

//Criar usuário padrão no banco
/*
INSERT INTO usuarios (username, password, name)
VALUES ('admin', '$2b$12$BOvbyLCHB96W7lM6JJABT.9B5eU4OWS290XJZe/ECitFcz8qa0LSK', 'Administrador');
*/

require 'connection.php';

$dados = json_decode(file_get_contents('php://input'), true);

$user = $dados['user'];
$password = $dados['password'];

$stmt = $pdo->prepare("SELECT * FROM user WHERE username = ?");
$stmt->execute([$user]);
$userData = $stmt->fetch(PDO::FETCH_ASSOC);

if ($userData && password_verify($password, $userData['password'])) {
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $userData['id'],
            'name' => $userData['name'],
            'username' => $userData['username'],
        ],
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuário ou senha inválidos']);
}