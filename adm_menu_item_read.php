<?php
require_once 'Connection.php';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    $stmt = $pdo->query("
        SELECT mi.*, mc.name AS category_name 
        FROM menu_items mi 
        LEFT JOIN menu_categories mc ON mi.category_id = mc.id 
        ORDER BY mi.id DESC
    ");
    $menu_items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($menu_items);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar los ítems del menú: ' . $e->getMessage()]);
}
?>