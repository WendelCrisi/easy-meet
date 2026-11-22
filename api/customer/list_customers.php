<?php

require '../connection.php';

try {
    $search = $_GET['search'] ?? '';

    $stmt = $pdo->prepare("SELECT id, company_name, name FROM customer WHERE name LIKE ? ORDER BY name");
    $stmt->execute(['%' . $search . '%']);
    $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'customers' => $customers]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}