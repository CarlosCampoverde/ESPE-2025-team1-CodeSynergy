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
    $menu_details = '';
    $services_details = '';
    
    // Paso 4: Procesar menú seleccionado
    if (isset($_POST['selected_menu'])) {
        // Menú predeterminado
        $menu_id = $_POST['selected_menu'];
        $guests = $_POST['guests'];
        
        // Obtener detalles del menú
        $stmt = $db->prepare("SELECT name, price_per_person FROM menus WHERE id = ?");
        $stmt->execute([$menu_id]);
        $menu = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $subtotal = $menu['price_per_person'] * $guests;
        $total += $subtotal;
        
        $menu_details = "
            <tr>
                <td>Menú {$menu['name']}</td>
                <td>{$guests} personas</td>
                <td>\${$menu['price_per_person']} c/u</td>
                <td>\${$subtotal}</td>
            </tr>
        ";
        
        // Guardar en quote_menus
        $stmt = $db->prepare("
            INSERT INTO quote_menus (quote_id, menu_id, people_count, subtotal) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$quote_id, $menu_id, $guests, $subtotal]);
    } elseif (isset($_POST['custom_items'])) {
        // Menú personalizado
        $custom_items = $_POST['custom_items'];
        $menu_details = '';
        
        foreach ($custom_items as $item_id) {
            $quantity = $_POST["item_{$item_id}_qty"] ?? 1;
            
            // Obtener detalles del ítem
            $stmt = $db->prepare("SELECT name, price FROM menu_items WHERE id = ?");
            $stmt->execute([$item_id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $subtotal = $item['price'] * $quantity;
            $total += $subtotal;
            
            $menu_details .= "
                <tr>
                    <td>{$item['name']}</td>
                    <td>{$quantity}</td>
                    <td>\${$item['price']}</td>
                    <td>\${$subtotal}</td>
                </tr>
            ";
            
            // Guardar en custom_menu_selections
            $stmt = $db->prepare("
                INSERT INTO custom_menu_selections (quote_id, item_id, quantity, unit_price) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$quote_id, $item_id, $quantity, $item['price']]);
        }
    }
    
    // Paso 5: Procesar servicios adicionales
    if (isset($_POST['services'])) {
        $services = $_POST['services'];
        $services_details = '';
        
        foreach ($services as $service_id) {
            $quantity = $_POST["service_{$service_id}_qty"] ?? 1;
            
            // Obtener detalles del servicio
            $stmt = $db->prepare("SELECT name, unit_price FROM services WHERE id = ?");
            $stmt->execute([$service_id]);
            $service = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $subtotal = $service['unit_price'] * $quantity;
            $total += $subtotal;
            
            $services_details .= "
                <tr>
                    <td>{$service['name']}</td>
                    <td>{$quantity}</td>
                    <td>\${$service['unit_price']}</td>
                    <td>\${$subtotal}</td>
                </tr>
            ";
            
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
    
    // Mostrar la cotización en HTML
    showQuoteHtml($quote_id, $_POST, $total, $menu_details, $services_details);
    
} catch (Exception $e) {
    // Revertir transacción en caso de error
    $db->rollBack();
    
    // Registrar error y redirigir a página de error
    error_log("Error al procesar cotización: " . $e->getMessage());
    header("Location: error.php?message=" . urlencode("Error al procesar la cotización"));
    exit;
}

function showQuoteHtml($quote_id, $form_data, $total, $menu_details, $services_details) {
    $html = '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cotización #'.$quote_id.'</title>
        <link rel="stylesheet" href="../css/styles.css">
        <style>
            .quote-container {
                max-width: 800px;
                margin: 20px auto;
                padding: 30px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .quote-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #2e7d32;
            }
            .quote-section {
                margin-bottom: 25px;
            }
            .quote-title {
                color: #2e7d32;
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
            }
            th {
                background-color: #2e7d32;
                color: white;
                text-align: left;
                padding: 10px;
            }
            td {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }
            .total-row {
                font-weight: bold;
                background-color: #f5f5f5;
            }
            .back-btn {
                display: block;
                width: 200px;
                margin: 30px auto 0;
                padding: 10px;
                background-color: #2e7d32;
                color: white;
                text-align: center;
                text-decoration: none;
                border-radius: 4px;
            }
            .back-btn:hover {
                background-color: #1b5e20;
            }
        </style>
    </head>
    <body>
        <div class="quote-container">
            <div class="quote-header">
                <h1>Cotización #'.$quote_id.'</h1>
                <p>Fecha: '.date('d/m/Y').'</p>
            </div>
            
            <div class="quote-section">
                <h2 class="quote-title">Información del Cliente</h2>
                <p><strong>Nombre:</strong> '.$form_data['first_name'].' '.$form_data['last_name'].'</p>
                <p><strong>Email:</strong> '.$form_data['email'].'</p>
                <p><strong>Teléfono:</strong> '.$form_data['phone'].'</p>
                <p><strong>Dirección:</strong> '.($form_data['address'] ?? 'N/A').'</p>
            </div>
            
            <div class="quote-section">
                <h2 class="quote-title">Detalles del Evento</h2>
                <p><strong>Tipo de Evento:</strong> '.$form_data['event_type'].'</p>
                <p><strong>Fecha:</strong> '.date('d/m/Y', strtotime($form_data['event_date'])).'</p>
                <p><strong>Ubicación:</strong> '.$form_data['location'].'</p>
                <p><strong>Número de Invitados:</strong> '.$form_data['guests'].'</p>
            </div>
            
            <div class="quote-section">
                <h2 class="quote-title">Menú Seleccionado</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Ítem</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        '.$menu_details.'
                    </tbody>
                </table>
            </div>';
    
    if (!empty($services_details)) {
        $html .= '
            <div class="quote-section">
                <h2 class="quote-title">Servicios Adicionales</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Servicio</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        '.$services_details.'
                    </tbody>
                </table>
            </div>';
    }
    
    $html .= '
            <div class="quote-section">
                <h2 class="quote-title">Resumen</h2>
                <table>
                    <tr class="total-row">
                        <td colspan="3" style="text-align: right;"><strong>TOTAL:</strong></td>
                        <td>\$'.number_format($total, 2).'</td>
                    </tr>
                </table>
            </div>';
    
    if (!empty($form_data['comments'])) {
        $html .= '
            <div class="quote-section">
                <h2 class="quote-title">Comentarios Adicionales</h2>
                <p>'.$form_data['comments'].'</p>
            </div>';
    }
    
    $html .= '
            <a href="../html/quote-form.html" class="back-btn">Volver al Formulario</a>
        </div>
    </body>
    </html>';
    
    echo $html;
    exit;
}
?>