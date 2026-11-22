<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $customer_id = $dados['customer_id'];
    $data_hora = $dados['data_hora'];
    $online = $dados['online'];
    $link = $dados['link'];
    $observacao = $dados['observacao'];

    $stmt = $pdo->prepare("INSERT INTO meeting (customer_id, data_hora, online, link, observacao) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$customer_id, $data_hora, $online, $link, $observacao]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}