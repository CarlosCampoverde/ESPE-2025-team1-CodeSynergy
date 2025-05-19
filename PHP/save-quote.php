<?php
require_once 'Connection.php';
header('Content-Type: application/json');

session_start();

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Usuario no autenticado');
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $selectionId = $_POST['selectionId'] ?? null;
    $services = json_decode($_POST['services'], true) ?? [];

    $connection = new Connection();
    $pdo = $connection->connect();

    // 1. Guardar servicios en quote_services
    $pdo->beginTransaction();
    
    foreach ($services as $service) {
        $stmt = $pdo->prepare("
            INSERT INTO quote_services (quote_id, service_id, quantity, subtotal)
            VALUES (
                :quote_id,
                :service_id,
                :quantity,
                (SELECT unit_price FROM services WHERE id = :service_id) * :quantity
            )
        ");
        $stmt->execute([
            ':quote_id' => $selectionId,
            ':service_id' => $service['id'],
            ':quantity' => $service['quantity']
        ]);
    }

    // 2. Actualizar total en quotes
    $stmt = $pdo->prepare("
        UPDATE quotes 
        SET total = (
            SELECT SUM(subtotal) FROM quote_menus WHERE quote_id = :quote_id
        ) + (
            SELECT COALESCE(SUM(subtotal), 0) FROM quote_services WHERE quote_id = :quote_id
        )
        WHERE id = :quote_id
    ");
    $stmt->execute([':quote_id' => $selectionId]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'quoteId' => $selectionId
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>