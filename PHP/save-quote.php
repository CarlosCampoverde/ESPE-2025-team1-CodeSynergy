<?php
require_once 'Connection.php';
header('Content-Type: application/json');
session_start();

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("Usuario no autenticado");
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $selectionId = $input['selectionId'] ?? null;
    $services = json_decode($input['services'] ?? '[]', true);

    if (!$selectionId) throw new Exception("ID de selección inválido");

    $connection = new Connection();
    $pdo = $connection->connect();
    $pdo->beginTransaction();

    // 1. Guardar servicios
    foreach ($services as $service) {
        $stmt = $pdo->prepare("
            INSERT INTO quote_services (quote_id, service_id, quantity, subtotal)
            VALUES (?, ?, ?, 
                (SELECT unit_price FROM services WHERE id = ?) * ?
            )
        ");
        $stmt->execute([
            $selectionId,
            $service['id'],
            $service['quantity'],
            $service['id'],
            $service['quantity']
        ]);
    }

    // 2. Actualizar total en la cotización
    $stmt = $pdo->prepare("
        UPDATE quotes SET 
            total = (
                SELECT SUM(subtotal) FROM quote_menus WHERE quote_id = ?
            ) + (
                SELECT COALESCE(SUM(subtotal), 0) FROM quote_services WHERE quote_id = ?
            ),
            status = 'pending'
        WHERE id = ?
    ");
    $stmt->execute([$selectionId, $selectionId, $selectionId]);

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