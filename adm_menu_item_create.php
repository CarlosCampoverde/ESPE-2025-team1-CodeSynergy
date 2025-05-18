<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Aquí no necesitamos validar los datos si estamos usando datos fijos, pero por seguridad, es bueno tener algo de control.
    
    // Datos fijos (quemados)
    $name = "Menú Ejemplo"; // Nombre del ítem
    $description = "Delicioso plato del día"; // Descripción
    $price = 9.99; // Precio fijo
    $category_id = 1; // ID de categoría (ajustar según lo que sea válido en tu base de datos)
    $is_active = 1; // Estado activo (1 para activo)

    try {
        // Crear la conexión
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // SQL de inserción
        $sql = "INSERT INTO menu_items (name, description, price, category_id, is_active)
                VALUES (:name, :description, :price, :category_id, :is_active)";

        // Preparar y ejecutar la sentencia SQL
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':price' => $price,
            ':category_id' => $category_id,
            ':is_active' => $is_active
        ]);

        // Mensaje de éxito
        echo "<script>
            alert('Ítem de menú registrado correctamente.');
            window.location.href = '../html/menu_items.php';
        </script>";

    } catch (\Throwable $th) {
        // En caso de error
        $msg = json_encode("Error al registrar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu_items.php';
        </script>";
    }
}
?>
