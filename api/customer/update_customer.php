<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $customer_id = $dados['customer_id'];
    $name = $dados['name'];
    $company_name = $dados['companyname'];
    $phone_number = $dados['phonenumber'];
    $email = $dados['email'];

    $stmt = $pdo->prepare("SELECT id FROM customer WHERE id = ?");
    $stmt->execute([$customer_id]);

    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Cliente não encontrado']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE customer SET name = ?, company_name = ?, phone_number = ?, email = ? WHERE id = ?");
    $stmt->execute([$name, $company_name, $phone_number, $email, $customer_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}