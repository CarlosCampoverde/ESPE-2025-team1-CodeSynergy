<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!isset($_POST['username'], $_POST['password'], $_POST['email'])) {
        die("Faltan datos del formulario.");
    }

    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $email = $_POST['email'];

    try {
        $connection = new Connection();
        $pdo = $connection->connect();

        $sql = "INSERT INTO users (username, password, email,role)
                VALUES (:username, :password, :email,'client')";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $password,
            ':email'    => $email
        ]);

        echo "<script>
            alert('Usuario registrado correctamente.');
            window.location.href = '../index.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al registrar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../index.php';
        </script>";
    }
}
