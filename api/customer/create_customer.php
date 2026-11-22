<?php

require '../connection.php';

try {
    $dados = json_decode(file_get_contents('php://input'), true);

    $companyname = $dados['companyname'];
    $name = $dados['name'];
    $phonenumber = $dados['phonenumber'];
    $email = $dados['email'];

    $stmt = $pdo->prepare("INSERT INTO customer (company_name, name, phone_number, email) VALUES (?, ?, ?, ?)");
    $stmt->execute([$companyname, $name, $phonenumber, $email]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}