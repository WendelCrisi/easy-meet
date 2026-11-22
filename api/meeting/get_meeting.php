<?php

require '../connection.php';

try {

    $meeting_id = $_GET['meeting_id'] ?? '';

    $stmt = $pdo->prepare("
        SELECT
            meeting.id,
            meeting.customer_id,
            customer.name AS customer_name,
            customer.company_name AS company_name,
            meeting.data_hora,
            meeting.observacao,
            meeting.online,
            meeting.link
        FROM meeting
        INNER JOIN customer
            ON meeting.customer_id = customer.id
        WHERE meeting.id = ?
    ");

    $stmt->execute([$meeting_id]);

    $meeting = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($meeting) {

        echo json_encode([
            'success' => true,
            'meeting' => $meeting
        ]);

    } else {

        echo json_encode([
            'success' => false,
            'message' => 'Reunião não encontrada'
        ]);
    }

} catch (PDOException $e) {

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}