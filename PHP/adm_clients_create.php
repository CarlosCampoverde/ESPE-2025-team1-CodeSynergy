<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar que los datos obligatorios hayan sido enviados
    if (!isset($_POST['first_name'], $_POST['last_name'])) {
        die("Faltan datos del formulario.");
    }

    // Obtener los datos del formulario
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $address = $_POST['address'] ?? null;

    try {
        // Conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // Consulta SQL preparada
        $sql = "INSERT INTO clients (first_name, last_name, email, phone, address)
                VALUES (:first_name, :last_name, :email, :phone, :address)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':email' => $email,
            ':phone' => $phone,
            ':address' => $address
        ]);

        // Mensaje de éxito
        echo "<script>
            alert('Cliente registrado correctamente.');
            window.location.href = '../html/clients.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al registrar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/clients.php';
        </script>";
    }
}
?>