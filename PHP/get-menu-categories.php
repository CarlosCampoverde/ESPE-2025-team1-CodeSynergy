<?php
require_once 'Connection.php';
header('Content-Type: application/json');

try {
    $connection = new Connection();
    $pdo = $connection->connect();

    $stmt = $pdo->query("
        SELECT id, name, min_selections, max_selections 
        FROM menu_categories 
        ORDER BY display_order ASC
    ");
    
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $categories
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
