<?php
require_once 'Connection.php';

header('Content-Type: application/json');

$type = $_GET['type'] ?? '';
$db = (new Connection())->connect();

try {
    switch ($type) {
        case 'menus':
            $stmt = $db->query("SELECT * FROM menus WHERE is_active = 1");
            $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($menus);
            break;
            
        case 'categories':
            $stmt = $db->query("SELECT * FROM menu_categories ORDER BY display_order");
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($categories);
            break;
            
        case 'items':
            $category_id = $_GET['category_id'] ?? 0;
            $stmt = $db->prepare("SELECT * FROM menu_items WHERE category_id = ? AND is_active = 1");
            $stmt->execute([$category_id]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($items);
            break;
            
        case 'services':
            $stmt = $db->query("SELECT * FROM services WHERE is_active = 1");
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
            break;
            
        default:
            echo json_encode(['error' => 'Tipo de solicitud no válido']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>