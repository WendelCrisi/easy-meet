<?php

require '../connection.php';

try {
    $search = $_GET['search'] ?? '';

    $stmt = $pdo->prepare("SELECT username, name FROM user WHERE username LIKE ? ORDER BY name");
    $stmt->execute(['%' . $search . '%']);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'users' => $users]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}