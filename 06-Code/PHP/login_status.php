<?php
require_once 'Connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $connection = new Connection();
        $pdo = $connection->connect();

        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
<<<<<<< HEAD:PHP/login_status.php

            // Redirige al dashboard
            header('Location: ../html/dashboard.php');
=======
            $_SESSION['role'] = $user['role']; // Asignar el rol
            header('Location: ../HTML/dashboard.php');
>>>>>>> 9cbbd33896a942857ca223e9af406ffe68329a04:06-Code/PHP/login_status.php
            exit;
        } else {
            $error_message = "Credenciales incorrectas. Intenta nuevamente.";
            header("Location: error.php?error_message=" . urlencode($error_message));
            exit;
        }
    } catch (\Throwable $th) {
        $error_message = "Error en la conexión: " . $th->getMessage();
        header("Location: error.php?error_message=" . urlencode($error_message));
        exit;
    }
}
?>