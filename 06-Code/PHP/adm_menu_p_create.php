<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar que todos los datos hayan sido enviados
    if (!isset($_POST['name_menu'], $_POST['description'], $_POST['price_per_person'], $_POST['type'])) {
        die("Faltan datos del formulario.");
    }

    // Obtener los datos del formulario
    $name_menu = $_POST['name_menu'];
    $description = $_POST['description'];
    $price_per_person = $_POST['price_per_person'];
    $type = $_POST['type'];

    try {
        // Conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // Consulta SQL preparada
        $sql = "INSERT INTO menus (name, description, price_per_person, type)
                VALUES (:name_menu, :description, :price_per_person, :type)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name_menu' => $name_menu,
            ':description' => $description,
            ':price_per_person' => $price_per_person,
            ':type' => $type
        ]);

        // Mensaje de éxito
        echo "<script>
            alert('Menú registrado correctamente.');
            window.location.href = '../html/menu.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al registrar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu.php';
        </script>";
    }
}
?>