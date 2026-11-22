<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $customer_id = $dados['customer_id'];

    $stmt = $pdo->prepare("DELETE FROM customer WHERE id = ?");
    $stmt->execute([$customer_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}