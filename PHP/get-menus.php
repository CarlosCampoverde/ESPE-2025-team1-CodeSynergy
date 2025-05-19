<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'Connection.php';
session_start();

header('Content-Type: application/json');

try {
    // Crear instancia de Connection y obtener PDO
    $connection = new Connection();
    $pdo = $connection->connect();

    $stmt = $pdo->query("
        SELECT mi.id, mi.name, mi.description, mi.price, 
               mc.id as category_id, mc.name as category_name 
        FROM menu_items mi
        JOIN menu_categories mc ON mi.category_id = mc.id
        ORDER BY mc.id, mi.name
    ");

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $items
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
