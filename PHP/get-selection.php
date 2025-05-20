<?php
require_once 'Connection.php';
header('Content-Type: application/json');

try {
    $connection = new Connection();
    $pdo = $connection->connect();

    $selectionId = $_GET['id'] ?? null;
    if (!$selectionId) throw new Exception("ID no proporcionado");

    // Consulta unificada con LEFT JOIN para ambos tipos de menú
    $stmt = $pdo->prepare("
        SELECT 
            q.id, 
            q.total, 
            IFNULL(m.name, 'Personalizado') AS menuName, 
            COALESCE(m.price_per_person, SUM(c.unit_price * c.quantity) / qm.people_count) AS price_per_person,
            qm.people_count,
            IF(m.id IS NULL, 'custom', 'predetermined') AS type
        FROM quotes q
        JOIN quote_menus qm ON q.id = qm.quote_id
        LEFT JOIN menus m ON qm.menu_id = m.id
        LEFT JOIN custom_menu_selections c ON q.id = c.quote_id
        WHERE q.id = ?
        GROUP BY q.id
    ");
    $stmt->execute([$selectionId]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$data) {
        throw new Exception("No se encontró la cotización");
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