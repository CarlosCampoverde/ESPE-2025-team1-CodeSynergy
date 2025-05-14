<?php
require_once 'Connection.php';
session_start();

$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $connection = new Connection();
        $pdo = $connection->connect();

        $sql = "SELECT * FROM usuarios WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id']; 
            $_SESSION['username'] = $user['username'];

            // Redirigir al dashboard
            header('Location: ../HTML/dashboard.html');
            exit;
        } else {
            $error_message = "Credenciales incorrectas";
        }

    } catch (\Throwable $th) {
        $error_message = "Error en la conexión: " . $th->getMessage();
    }
}
?>
