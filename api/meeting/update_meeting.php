<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);
    
    $meeting_id = $dados['meeting_id'];
    $customer_id = $dados['customer_id'];
    $data_hora = $dados['data_hora'];
    $online = $dados['online'];
    $link = $dados['link'];
    $observacao = $dados['observacao'];

    $stmt = $pdo->prepare("SELECT id FROM customer WHERE id = ?");
    $stmt->execute([$customer_id]);

    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Cliente não encontrado']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM meeting WHERE id = ?");
    $stmt->execute([$meeting_id]);

    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Reunião não encontrada']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE meeting SET customer_id = ?, data_hora = ?, online = ?, link = ?, observacao = ? WHERE id = ?");
    $stmt->execute([$customer_id, $data_hora, $online, $link, $observacao, $meeting_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}