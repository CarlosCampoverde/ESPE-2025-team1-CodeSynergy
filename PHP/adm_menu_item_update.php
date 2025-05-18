<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar datos enviados
    if (!isset($_POST['id'], $_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'], $_POST['is_active'])) {
        die("Faltan datos del formulario.");
    }

    // Obtener datos
    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $is_active = $_POST['is_active'];

    try {
        $conexion = new Connection();
        $pdo = $conexion->connect();

        $sql = "UPDATE menu_items
                SET name = :name,
                    description = :description,
                    price = :price,
                    category_id = :category_id,
                    is_active = :is_active
                WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':price' => $price,
            ':category_id' => $category_id,
            ':is_active' => $is_active,
            ':id' => $id
        ]);

        echo "<script>
            alert('Ítem de menú actualizado correctamente.');
            window.location.href = '../html/menu_items.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al actualizar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu_items.php';
        </script>";
    }
}
?>