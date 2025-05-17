<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // validar que todos los datos hayan sido enviados
    if (
        !isset($_POST['name_menu'], $_POST['description'], $_POST['price_per_person'])
    ) {
        die("Faltan datos del formulario.");
    }

    // obtener los datos del formulario
    $name_menu = $_POST['name_menu'];
    $description = $_POST['description'];
    $price_per_person = $_POST['price_per_person'];

    try {
        // conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // consulta SQL preparada
        $sql = "INSERT INTO menus (name, description, price_per_person)
                VALUES (:name_menu, :description, :price_per_person)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name_menu'          => $name_menu,
            ':description'          => $description,
            ':price_per_person'   => $price_per_person,
        ]);

        // mensaje de exito
        echo "<script>
            alert('Vehiculo registrado correctamente.');
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
