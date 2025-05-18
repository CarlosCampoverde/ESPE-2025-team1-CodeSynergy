<?php
// Activar reporte de errores (solo para desarrollo)
ini_set('display_errors', 0); // Cambiar a 1 para ver errores
ini_set('display_startup_errors', 0);
error_reporting(0);

// Forzar el tipo de contenido JSON
header('Content-Type: application/json');

// Incluir la clase de conexión
require_once __DIR__ . '/Connection.php';

try {
    // Establecer conexión
    $connection = new Connection();
    $pdo = $connection->connect();
    
    // Verificar método y acción
    $stmt = $pdo->query("
    SELECT 
        c.id AS category_id,
        c.name AS category_name,
        c.min_selections,
        c.max_selections,
        i.id,
        i.name,  /* Usando el nombre real de tu columna */
        i.description,
        i.price,
        i.image_url,
        i.allergens,
        i.allow_quantity,
        i.max_quantity
    FROM 
        menu_categories c
    LEFT JOIN 
        menu_items i ON c.id = i.category_id AND i.is_active = 1
    ORDER BY 
        c.display_order, i.name
");
        
        if ($stmt === false) {
            throw new Exception('Error en la consulta SQL');
        }
        
        $categories = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $categoryId = $row['category_id'];
            if (!isset($categories[$categoryId])) {
                $categories[$categoryId] = [
                    'name' => $row['category_name'],
                    'min_selections' => $row['min_selections'],
                    'max_selections' => $row['max_selections'],
                    'items' => []
                ];
            }
            
            if ($row['item_id']) {
                $categories[$categoryId]['items'][] = [
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'description' => $row['item_description'],
                    'price' => $row['price'],
                    'image_url' => $row['image_url'],
                    'allergens' => $row['allergens']
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'categories' => array_values($categories)
        ]);
        exit;
    
    throw new Exception('Acción no válida');
    
} catch (Exception $e) {
    // Respuesta de error controlada
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error' => true
    ]);
    exit;
}