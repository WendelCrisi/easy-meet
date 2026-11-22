<?php

require '../connection.php';

try {

    $search = $_GET['search'] ?? '';

    $stmt = $pdo->prepare("
        SELECT
            meeting.id,
            meeting.customer_id,
            customer.name AS customer_name,
            customer.company_name AS company_name,
            meeting.data_hora,
            meeting.online,
            meeting.link,
            meeting.observacao
        FROM meeting
        INNER JOIN customer
            ON meeting.customer_id = customer.id
        WHERE customer.name LIKE ?
           OR customer.company_name LIKE ?
        ORDER BY meeting.data_hora
    ");

    $stmt->execute([
        '%' . $search . '%',
        '%' . $search . '%'
    ]);

    $meetings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'meetings' => $meetings
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}