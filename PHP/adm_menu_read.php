<?php
require_once 'Connection.php';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    $stmt = $pdo->query("SELECT * FROM menus ORDER BY id DESC");
    $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($menus);

} catch (Exception $e) {
    // En caso de error, enviar una respuesta 500
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar los menús: ' . $e->getMessage()]);
}
?>
