<?php
require_once 'Connection.php';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    $stmt = $pdo->query("SELECT * FROM vehiculos ORDER BY id DESC");
    $vehiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($vehiculos);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar vehiculos: ' . $e->getMessage()]);
}
