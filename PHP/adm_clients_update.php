<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar que todos los datos obligatorios hayan sido enviados
    if (!isset($_POST['id_client'], $_POST['first_name'], $_POST['last_name'])) {
        die("Faltan datos del formulario.");
    }

    // Obtener los datos
    $id_client = $_POST['id_client'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $address = $_POST['address'] ?? null;

    try {
        // Conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // SQL para actualizar
        $sql = "UPDATE clients
                SET first_name = :first_name,
                    last_name = :last_name,
                    email = :email,
                    phone = :phone,
                    address = :address
                WHERE id = :id_client";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':email' => $email,
            ':phone' => $phone,
            ':address' => $address,
            ':id_client' => $id_client
        ]);

        echo "<script>
            alert('Cliente actualizado correctamente.');
            window.location.href = '../html/clients.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al actualizar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/clients.php';
        </script>";
    }
}
?>