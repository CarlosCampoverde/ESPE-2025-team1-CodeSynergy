<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar datos enviados
    if (!isset($_POST['name'], $_POST['description'], $_POST['price'], $_POST['category_id'], $_POST['is_active'])) {
        die("Faltan datos del formulario.");
    }

    // Obtener datos
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $is_active = $_POST['is_active'];

    try {
        $conexion = new Connection();
        $pdo = $conexion->connect();

        $sql = "INSERT INTO menu_items (name, description, price, category_id, is_active)
                VALUES (:name, :description, :price, :category_id, :is_active)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':description' => $description,
            ':price' => $price,
            ':category_id' => $category_id,
            ':is_active' => $is_active
        ]);

        echo "<script>
            alert('Ítem de menú registrado correctamente.');
            window.location.href = '../html/menu_items.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al registrar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu_items.php';
        </script>";
    }
}
?>