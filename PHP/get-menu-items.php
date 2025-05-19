<?php
require_once 'Connection.php';

header('Content-Type: application/json');

try {
    // Crear instancia y conectar
    $connection = new Connection();
    $pdo = $connection->connect();

    $type = $_GET['type'] ?? '';

    if ($type === 'predetermined') {
        $stmt = $pdo->query("SELECT id, name, description, price_per_person FROM menus WHERE type = 'predefined'");
        $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $menus
        ]);

    } elseif ($type === 'custom') {
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

    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Tipo de menú no especificado o inválido'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
