<?php
require_once 'Connection.php';

header('Content-Type: application/json');

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    if (isset($_GET['name'])) {
        $name = '%' . $_GET['name'] . '%';
        $sql = "SELECT id, CONCAT(first_name, ' ', last_name) AS name 
                FROM clients 
                WHERE CONCAT(first_name, ' ', last_name) LIKE :name 
                LIMIT 10";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['name' => $name]);
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($clients);
        exit;
    }

    if (isset($_GET['client_id'])) {
        $client_id = (int)$_GET['client_id'];
        $sql = "SELECT q.id, q.quote_date, q.total, q.status 
                FROM quotes q 
                JOIN events e ON q.event_id = e.id 
                WHERE e.client_id = :client_id 
                ORDER BY q.quote_date DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['client_id' => $client_id]);
        $quotes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($quotes);
        exit;
    }

    echo json_encode(['error' => 'Parámetros inválidos']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>