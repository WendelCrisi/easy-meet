<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $usernameOriginal = $dados['username_original'];
    $name = $dados['name'];
    $username = $dados['username'];
    $password = $dados['password'];

    $stmt = $pdo->prepare("SELECT id FROM user WHERE username = ? AND username != ?");
    $stmt->execute([$username, $usernameOriginal]);

    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Nome de usuário já existe']);
        exit;
    }

    if ($password) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE user SET name = ?, username = ?, password = ? WHERE username = ?");
        $stmt->execute([$name, $username, $passwordHash, $usernameOriginal]);
    } else {
        $stmt = $pdo->prepare("UPDATE user SET name = ?, username = ? WHERE username = ?");
        $stmt->execute([$name, $username, $usernameOriginal]);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}