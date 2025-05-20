<?php
require_once 'Connection.php';
header('Content-Type: application/json');
session_start();

$response = ['success' => false, 'error' => ''];
$pdo = null;

try {
    // 1. Validar sesión
    if (empty($_SESSION['user_id'])) {
        throw new Exception("Debes iniciar sesión");
    }

    // 2. Decodificar JSON
    $input = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON inválido");
    }

    $selectionId = $input['selectionId'] ?? null;
    $eventId = $input['eventId'] ?? null;
    $menus = $input['menus'] ?? [];
    $services = $input['services'] ?? [];

    // 3. Validar datos
    if (empty($selectionId)) throw new Exception("ID de cotización faltante");
    if (empty($eventId)) throw new Exception("ID de evento faltante");

    // 4. Conectar a la base de datos
    $connection = new Connection();
    $pdo = $connection->connect();
    $pdo->beginTransaction();

    // 5. Insertar menús (¡NUEVO!)
    foreach ($menus as $menu) {
        $stmt = $pdo->prepare("
            INSERT INTO quote_menus (quote_id, menu_id, people_count, subtotal)
            SELECT ?, ?, ?, price_per_person * ?
            FROM menus WHERE id = ?
        ");
        $stmt->execute([
            $selectionId,
            $menu['id'],
            $menu['people'],
            $menu['people'],
            $menu['id']
        ]);
    }

    // 6. Insertar servicios (ya existente)
    foreach ($services as $service) {
        $stmt = $pdo->prepare("
            INSERT INTO quote_services (quote_id, service_id, quantity, subtotal)
            SELECT ?, ?, ?, unit_price * ?
            FROM services WHERE id = ?
        ");
        $stmt->execute([
            $selectionId,
            $service['id'],
            $service['quantity'],
            $service['quantity'],
            $service['id']
        ]);
    }

    // 7. Actualizar total en `quotes`
    $stmt = $pdo->prepare("
        UPDATE quotes 
        SET total = (
            SELECT COALESCE(SUM(subtotal), 0) FROM quote_menus WHERE quote_id = ?
        ) + (
            SELECT COALESCE(SUM(subtotal), 0) FROM quote_services WHERE quote_id = ?
        )
        WHERE id = ?
    ");
    $stmt->execute([$selectionId, $selectionId, $selectionId]);

    $pdo->commit();
    $response = ['success' => true, 'quoteId' => $selectionId];

} catch (Exception $e) {
    if ($pdo && $pdo->inTransaction()) $pdo->rollBack();
    $response['error'] = $e->getMessage();
} finally {
    echo json_encode($response);
}
?>