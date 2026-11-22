<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $name = $dados['name'];
    $username = $dados['username'];
    $password = password_hash($dados['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT id FROM user WHERE username = ?");
    $stmt->execute([$username]);

    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Nome de usuário já existe']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO user (name, username, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $username, $password]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}