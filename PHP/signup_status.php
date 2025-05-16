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
        //comprobar que el username o el correo no existan
        $sql = "SELECT * FROM users WHERE username = :username OR email = :email";  
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':email'    => $email
        ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            $msg = json_encode("El nombre de usuario o el correo electrónico ya están en uso.");
            echo "<script>
                alert($msg);
                window.location.href = '../index.php';
            </script>";
            exit;
        }

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
