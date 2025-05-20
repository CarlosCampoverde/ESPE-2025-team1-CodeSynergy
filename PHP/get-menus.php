<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'Connection.php';
session_start();

header('Content-Type: application/json');

try {
    // Crear conexión
    $connection = new Connection();
    $pdo = $connection->connect();

    // Consulta: obtener menús que sean 'predetermined' y estén activos
    $stmt = $pdo->query("
        SELECT 
            id, 
            name, 
            description, 
            price_per_person, 
            type, 
            is_active, 
            min_guests, 
            max_guests, 
            created_at, 
            updated_at
        FROM menus
        WHERE type = 'predetermined' AND is_active = 1
        ORDER BY name
    ");

    $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $menus
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>

