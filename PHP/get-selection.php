<?php
require_once 'Connection.php';
header('Content-Type: application/json');

try {
    $connection = new Connection();
    $pdo = $connection->connect();

    $selectionId = $_GET['id'] ?? null;
    if (!$selectionId) throw new Exception("ID no proporcionado");

    // Obtener datos básicos de la selección
    $stmt = $pdo->prepare("
        SELECT q.id, q.total, m.name AS menuName, m.price_per_person, 
               qm.peopleCount, 'predetermined' AS type
        FROM quotes q
        JOIN quote_menus qm ON q.id = qm.quote_id
        JOIN menus m ON qm.menu_id = m.id
        WHERE q.id = ?
    ");
    $stmt->execute([$selectionId]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$data) {
        // Buscar si es menú personalizado
        $stmt = $pdo->prepare("
            SELECT q.id, SUM(c.unit_price * c.quantity) / qm.peopleCount AS price_per_person,
                   qm.peopleCount, 'custom' AS type, 'Personalizado' AS menuName
            FROM quotes q
            JOIN quote_menus qm ON q.id = qm.quote_id
            JOIN custom_menu_selections c ON q.id = c.quote_id
            WHERE q.id = ?
        ");
        $stmt->execute([$selectionId]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'success' => true,
        'data' => $data
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>