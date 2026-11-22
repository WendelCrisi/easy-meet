<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $meeting_id = $dados['meeting_id'];

    $stmt = $pdo->prepare("DELETE FROM meeting WHERE id = ?");
    $stmt->execute([$meeting_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}