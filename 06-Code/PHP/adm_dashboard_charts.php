<?php
require_once 'Connection.php';

header('Content-Type: application/json');

$type = isset($_GET['type']) ? $_GET['type'] : '';

try {
    $conexion = new Connection();
    $pdo = $conexion->connect();

    if ($type === 'years') {
        $sql = "SELECT DISTINCT YEAR(quote_date) AS year FROM quotes ORDER BY year";
        $stmt = $pdo->query($sql);
        $years = $stmt->fetchAll(PDO::FETCH_COLUMN);
        echo json_encode(['years' => $years]);
        exit;
    }

    if ($type === 'quotes_by_month') {
        $year = isset($_GET['year']) ? (int)$_GET['year'] : date('Y');
        $sql = "SELECT MONTH(quote_date) AS month, COUNT(*) AS count 
                FROM quotes 
                WHERE YEAR(quote_date) = :year 
                GROUP BY MONTH(quote_date)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['year' => $year]);
        $data = array_fill(1, 12, 0);
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[$row['month']] = (int)$row['count'];
        }
        echo json_encode(['counts' => array_values($data)]);
        exit;
    }

    if ($type === 'top_menus') {
        $sql = "SELECT m.name, COUNT(qm.menu_id) AS count 
                FROM quote_menus qm 
                JOIN menus m ON qm.menu_id = m.id 
                GROUP BY qm.menu_id, m.name 
                ORDER BY count DESC 
                LIMIT 5";
        $stmt = $pdo->query($sql);
        $names = [];
        $counts = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $names[] = $row['name'];
            $counts[] = (int)$row['count'];
        }
        echo json_encode(['names' => $names, 'counts' => $counts]);
        exit;
    }

    if ($type === 'top_clients') {
        $sql = "SELECT c.id, CONCAT(c.first_name, ' ', c.last_name) AS client_name, COUNT(q.id) AS quote_count 
                FROM quotes q 
                JOIN events e ON q.event_id = e.id 
                JOIN clients c ON e.client_id = c.id 
                GROUP BY c.id, c.first_name, c.last_name 
                ORDER BY quote_count DESC 
                LIMIT 5";
        $stmt = $pdo->query($sql);
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($clients);
        exit;
    }

    if ($type === 'metrics') {
        $year = date('Y');
        // Ingresos totales
        $sql = "SELECT SUM(total) AS total_income FROM quotes WHERE YEAR(quote_date) = :year";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['year' => $year]);
        $total_income = $stmt->fetchColumn() ?: 0;

        // Número de eventos
        $sql = "SELECT COUNT(*) AS event_count FROM events WHERE YEAR(event_date) = :year";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['year' => $year]);
        $event_count = $stmt->fetchColumn();

        // Clientes nuevos
        $sql = "SELECT COUNT(*) AS new_clients FROM clients WHERE YEAR(created_at) = :year";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['year' => $year]);
        $new_clients = $stmt->fetchColumn();

        echo json_encode([
            'total_income' => (float)$total_income,
            'event_count' => (int)$event_count,
            'new_clients' => (int)$new_clients
        ]);
        exit;
    }

    echo json_encode(['error' => 'Tipo de consulta inválido']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>