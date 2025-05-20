<?php
require_once 'Connection.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Importante para evitar CORS

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

    // Verifica si hay datos
    if (empty($services)) {
        throw new Exception('No hay servicios activos disponibles');
    }

    echo json_encode([
        'success' => true,
        'data' => $services
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>