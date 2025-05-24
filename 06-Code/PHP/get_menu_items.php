<?php
require_once 'Connection.php';
header('Content-Type: application/json');

try {
    $connection = new Connection();
    $pdo = $connection->connect();

    // Validar category_id
    $categoryId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : 0;
    if ($categoryId <= 0) {
        throw new Exception('ID de categoría inválido');
    }

    // Consulta con JOIN para obtener también el nombre de la categoría
    $stmt = $pdo->prepare("
        SELECT 
            mi.id, 
            mi.name, 
            mi.description, 
            mi.price, 
            mi.allergens, 
            mi.image_url,
            mi.category_id,
            mc.name AS category_name
        FROM menu_items mi
        JOIN menu_categories mc ON mi.category_id = mc.id
        WHERE mi.category_id = :category_id AND mi.is_active = 1
        ORDER BY mi.name ASC
    ");
    
    $stmt->bindParam(':category_id', $categoryId, PDO::PARAM_INT);
    $stmt->execute();
    
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $items
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>