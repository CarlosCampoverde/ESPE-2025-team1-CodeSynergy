<?php
require_once 'Connection.php';

header('Content-Type: application/json');

session_start();

// Verificar sesión
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Unauthorized'
    ]);
    exit;
}

// Obtener datos
$input = json_decode(file_get_contents('php://input'), true);
$selection = json_decode($input['selection'], true);

try {
    $pdo = Connection::get()->connect();
    
    // Guardar en la base de datos (ejemplo simplificado)
    $stmt = $pdo->prepare("
        INSERT INTO quotes 
        (user_id, event_id, menu_type, menu_data, people_count, status, created_at)
        VALUES (:user_id, :event_id, :menu_type, :menu_data, :people_count, 'draft', NOW())
    ");
    
    $eventId = 1; // Esto debería venir de tu aplicación
    $menuData = [];
    
    if ($selection['type'] === 'predetermined') {
        $menuData = ['menu_id' => $selection['menuId']];
    } else {
        $menuData = ['items' => $selection['customItems']];
    }
    
    $stmt->execute([
        ':user_id' => $_SESSION['user_id'],
        ':event_id' => $eventId,
        ':menu_type' => $selection['type'],
        ':menu_data' => json_encode($menuData),
        ':people_count' => $selection['peopleCount']
    ]);
    
    $quoteId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'selectionId' => $quoteId
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>