<?php
require_once 'Connection.php';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    // Obtener parámetros de filtro
    $name = isset($_GET['name']) ? '%' . $_GET['name'] . '%' : '%';
    $type = isset($_GET['type']) && $_GET['type'] !== '' ? $_GET['type'] : null;
    $price = isset($_GET['price']) && $_GET['price'] !== '' ? floatval($_GET['price']) : null;
    $status = isset($_GET['status']) && $_GET['status'] !== '' ? intval($_GET['status']) : null;

    // Construir la consulta SQL con filtros
    $sql = "SELECT * FROM menus WHERE name LIKE :name";
    $params = [':name' => $name];

    if ($type !== null) {
        $sql .= " AND type = :type";
        $params[':type'] = $type;
    }
    if ($price !== null) {
        $sql .= " AND price_per_person <= :price";
        $params[':price'] = $price;
    }
    if ($status !== null) {
        $sql .= " AND is_active = :status";
        $params[':status'] = $status;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($menus);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar los menús: ' . $e->getMessage()]);
}
?>