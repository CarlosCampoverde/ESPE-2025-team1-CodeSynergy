<?php
require_once 'Connection.php';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    // Obtener parámetros de filtro
    $name = isset($_GET['name']) ? '%' . $_GET['name'] . '%' : '%';
    $email = isset($_GET['email']) ? '%' . $_GET['email'] . '%' : '%';
    $phone = isset($_GET['phone']) ? '%' . $_GET['phone'] . '%' : '%';

    // Construir la consulta SQL con filtros
    $sql = "SELECT * FROM clients 
            WHERE (first_name LIKE :name OR last_name LIKE :name)
            AND email LIKE :email
            AND phone LIKE :phone";
    $params = [
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone
    ];

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($clients);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar los clientes: ' . $e->getMessage()]);
}
?>