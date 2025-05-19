<?php
require_once 'Connection.php';
header('Content-Type: application/json');

try {
    $connection = new Connection();
    $pdo = $connection->connect();

    $stmt = $pdo->query("
        SELECT id, name, description, unit_price, price_type 
        FROM services 
        WHERE is_active = 1
        ORDER BY name
    ");

    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $services
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al cargar servicios: ' . $e->getMessage()
    ]);
}
?>