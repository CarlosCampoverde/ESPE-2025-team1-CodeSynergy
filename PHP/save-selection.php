<?php
require_once 'Connection.php';
session_start();

header('Content-Type: application/json');

try {
    // Verificar sesión
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('Usuario no autenticado');
    }

    $connection = new Connection();
    $pdo = $connection->connect();

    // Obtener datos JSON
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['selection'])) {
        throw new Exception('Datos de selección no proporcionados');
    }

    $selection = json_decode($input['selection'], true);
    if (!$selection) {
        throw new Exception('Formato de selección inválido');
    }

    // Iniciar transacción
    $pdo->beginTransaction();

    // 1. Crear la cotización
    $stmt = $pdo->prepare("
        INSERT INTO quotes (event_id, total, status)
        VALUES (:event_id, :total, 'pending')
    ");
    
    // Necesitarías obtener el event_id del usuario actual
    $eventId = obtenerEventoUsuarioActual($pdo, $_SESSION['user_id']);
    
    $total = calcularTotal($selection);
    
    $stmt->execute([
        ':event_id' => $eventId,
        ':total' => $total
    ]);
    
    $quoteId = $pdo->lastInsertId();

    // 2. Guardar menú personalizado
    if ($selection['type'] === 'custom' && !empty($selection['customItems'])) {
        foreach ($selection['customItems'] as $item) {
            $stmt = $pdo->prepare("
                INSERT INTO custom_menu_selections 
                (quote_id, item_id, quantity, unit_price)
                VALUES (:quote_id, :item_id, :quantity, :unit_price)
            ");
            
            $stmt->execute([
                ':quote_id' => $quoteId,
                ':item_id' => $item['id'],
                ':quantity' => $item['quantity'],
                ':unit_price' => $item['price']
            ]);
        }
        
        // Registrar también en quote_menus como menú personalizado
        $stmt = $pdo->prepare("
            INSERT INTO quote_menus 
            (quote_id, menu_id, people_count, subtotal)
            VALUES (:quote_id, NULL, :people_count, :subtotal)
        ");
        
        $subtotal = array_reduce($selection['customItems'], function($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);
        
        $stmt->execute([
            ':quote_id' => $quoteId,
            ':people_count' => $selection['peopleCount'],
            ':subtotal' => $subtotal
        ]);
    }

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'selectionId' => $quoteId,
        'message' => 'Menú personalizado guardado correctamente'
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

// Funciones auxiliares
function obtenerEventoUsuarioActual($pdo, $userId) {
    $stmt = $pdo->prepare("
        SELECT id FROM events 
        WHERE client_id = (SELECT id FROM clients WHERE user_id = :user_id)
        ORDER BY event_date DESC LIMIT 1
    ");
    $stmt->execute([':user_id' => $userId]);
    $event = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$event) {
        throw new Exception('No se encontró evento para el usuario');
    }
    
    return $event['id'];
}

function calcularTotal($selection) {
    if ($selection['type'] === 'custom') {
        return array_reduce($selection['customItems'], function($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);
    }
    // Lógica para menús predeterminados si es necesario
    return 0;
}
?>