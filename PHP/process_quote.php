<?php
require_once 'Connection.php';

// Iniciar sesión para manejar transacciones
session_start();

// Validar que todos los datos requeridos estén presentes
$required_fields = [
    'first_name', 'last_name', 'email', 'phone', 
    'event_type', 'event_date', 'location', 'guests'
];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        die(json_encode(['error' => "El campo $field es requerido"]));
    }
}

$db = (new Connection())->connect();

try {
    // Iniciar transacción
    $db->beginTransaction();
    
    // Paso 1: Guardar cliente (o actualizar si ya existe)
    $stmt = $db->prepare("
        INSERT INTO clients (first_name, last_name, email, phone, address) 
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            first_name = VALUES(first_name),
            last_name = VALUES(last_name),
            phone = VALUES(phone),
            address = VALUES(address)
    ");
    
    $stmt->execute([
        $_POST['first_name'],
        $_POST['last_name'],
        $_POST['email'],
        $_POST['phone'],
        $_POST['address'] ?? null
    ]);
    
    // Obtener ID del cliente (nuevo o existente)
    $client_id = $db->lastInsertId() ?: $db->query("SELECT id FROM clients WHERE email = '{$_POST['email']}'")->fetchColumn();
    
    // Paso 2: Guardar evento
    $stmt = $db->prepare("
        INSERT INTO events (client_id, event_type, event_date, location, guests) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $client_id,
        $_POST['event_type'],
        $_POST['event_date'],
        $_POST['location'],
        $_POST['guests']
    ]);
    
    $event_id = $db->lastInsertId();
    
    // Paso 3: Crear cotización
    $stmt = $db->prepare("
        INSERT INTO quotes (event_id, quote_date, status) 
        VALUES (?, NOW(), 'pending')
    ");
    
    $stmt->execute([$event_id]);
    $quote_id = $db->lastInsertId();
    
    $total = 0;
    
    // Paso 4: Procesar menú seleccionado
    if (isset($_POST['selected_menu'])) {
        // Menú predeterminado
        $menu_id = $_POST['selected_menu'];
        $guests = $_POST['guests'];
        
        // Obtener precio del menú
        $stmt = $db->prepare("SELECT price_per_person FROM menus WHERE id = ?");
        $stmt->execute([$menu_id]);
        $price = $stmt->fetchColumn();
        
        $subtotal = $price * $guests;
        $total += $subtotal;
        
        // Guardar en quote_menus
        $stmt = $db->prepare("
            INSERT INTO quote_menus (quote_id, menu_id, people_count, subtotal) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$quote_id, $menu_id, $guests, $subtotal]);
    } elseif (isset($_POST['custom_items'])) {
        // Menú personalizado
        $custom_items = $_POST['custom_items'];
        
        foreach ($custom_items as $item_id) {
            $quantity = $_POST["item_{$item_id}_qty"] ?? 1;
            
            // Obtener precio del ítem
            $stmt = $db->prepare("SELECT price FROM menu_items WHERE id = ?");
            $stmt->execute([$item_id]);
            $price = $stmt->fetchColumn();
            
            $subtotal = $price * $quantity;
            $total += $subtotal;
            
            // Guardar en custom_menu_selections
            $stmt = $db->prepare("
                INSERT INTO custom_menu_selections (quote_id, item_id, quantity, unit_price) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$quote_id, $item_id, $quantity, $price]);
        }
    }
    
    // Paso 5: Procesar servicios adicionales
    if (isset($_POST['services'])) {
        $services = $_POST['services'];
        
        foreach ($services as $service_id) {
            $quantity = $_POST["service_{$service_id}_qty"] ?? 1;
            
            // Obtener precio del servicio
            $stmt = $db->prepare("SELECT unit_price FROM services WHERE id = ?");
            $stmt->execute([$service_id]);
            $price = $stmt->fetchColumn();
            
            $subtotal = $price * $quantity;
            $total += $subtotal;
            
            // Guardar en quote_services
            $stmt = $db->prepare("
                INSERT INTO quote_services (quote_id, service_id, quantity, subtotal) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$quote_id, $service_id, $quantity, $subtotal]);
        }
    }
    
    // Paso 6: Actualizar total en la cotización
    $stmt = $db->prepare("UPDATE quotes SET total = ? WHERE id = ?");
    $stmt->execute([$total, $quote_id]);
    
    // Paso 7: Guardar comentarios si existen
    if (!empty($_POST['comments'])) {
        $stmt = $db->prepare("
            INSERT INTO comments (client_id, quote_id, message) 
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$client_id, $quote_id, $_POST['comments']]);
    }
    
    // Confirmar transacción
    $db->commit();
    
    // Redirigir a página de éxito con el ID de la cotización
    header("Location: quote_success.php?quote_id=$quote_id");
    exit;
    
} catch (Exception $e) {
    // Revertir transacción en caso de error
    $db->rollBack();
    
    // Registrar error y redirigir a página de error
    error_log("Error al procesar cotización: " . $e->getMessage());
    header("Location: error.php?message=" . urlencode("Error al procesar la cotización"));
    exit;
}
?>