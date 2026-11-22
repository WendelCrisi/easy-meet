<?php

require '../connection.php';

try {
    
    $customer_id = $_GET['customer_id'] ?? '';

    $stmt = $pdo->prepare("SELECT id, name, company_name, phone_number, email FROM customer WHERE id = ?");
    $stmt->execute([$customer_id]);
    $customer = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($customer) {
        echo json_encode(['success' => true, 'customer' => $customer]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Cliente não encontrado']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}