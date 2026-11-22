<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $username = $dados['username'];
    $usuarioLogado = $dados['usuario_logado'] ?? '';

    if ($username === $usuarioLogado) {
        echo json_encode(['success' => false, 'message' => 'Você não pode excluir seu próprio usuário']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM user WHERE username = ?");
    $stmt->execute([$username]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}