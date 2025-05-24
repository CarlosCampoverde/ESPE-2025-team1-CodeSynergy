<?php
require_once 'Connection.php';
session_start();

header('Content-Type: application/json');

try {
    // 1. Verificar sesión
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Usuario no autenticado');
    }

    $connection = new Connection();
    $pdo = $connection->connect();

    // 2. Obtener datos JSON
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['selection'])) {
        throw new Exception('Datos de selección no proporcionados');
    }

    $selection = json_decode($input['selection'], true);
    if (!$selection) {
        throw new Exception('Formato de selección inválido');
    }

    // 3. Obtener o crear evento automáticamente
    if (!isset($_SESSION['current_event_id'])) {
        $stmt = $pdo->prepare("
            INSERT INTO events (client_id, event_type, event_date, guests)
            VALUES (
                (SELECT id FROM clients WHERE user_id = ?),
                'Evento rápido',
                NOW(),
                1
            )
        ");
        $stmt->execute([$_SESSION['user_id']]);
        $_SESSION['current_event_id'] = $pdo->lastInsertId();
    }
    $eventId = $_SESSION['current_event_id'];

    // 4. Iniciar transacción
    $pdo->beginTransaction();

    // 5. Calcular total
    $total = ($selection['type'] === 'custom')
        ? array_reduce($selection['customItems'], function($carry, $item) { return $carry + ($item['price'] * $item['quantity']); }, 0)
        : $selection['peopleCount'] * obtenerPrecioMenu($pdo, $selection['menuId']);

    // 6. Guardar en quotes
    $stmt = $pdo->prepare("
        INSERT INTO quotes (event_id, total, status)
        VALUES (?, ?, 'pending')
    ");
    $stmt->execute([$eventId, $total]);
    $quoteId = $pdo->lastInsertId();

    // 7. Guardar en quote_menus
    $stmt = $pdo->prepare("
        INSERT INTO quote_menus (quote_id, menu_id, people_count, subtotal)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([
        $quoteId,
        $selection['type'] === 'predetermined' ? $selection['menuId'] : NULL,
        $selection['peopleCount'],
        $total
    ]);

    // 8. Si es personalizado, guardar items
    if ($selection['type'] === 'custom') {
        foreach ($selection['customItems'] as $item) {
            $stmt = $pdo->prepare("
                INSERT INTO custom_menu_selections (quote_id, item_id, quantity, unit_price)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$quoteId, $item['id'], $item['quantity'], $item['price']]);
        }
    }

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'selectionId' => $quoteId
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

// Función auxiliar para menús predeterminados
function obtenerPrecioMenu($pdo, $menuId) {
    $stmt = $pdo->prepare("SELECT price_per_person FROM menus WHERE id = ?");
    $stmt->execute([$menuId]);
    return $stmt->fetchColumn() ?? 0;
}
?>