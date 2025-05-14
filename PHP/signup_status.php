<?php
    require_once 'Connection.php';
    session_start();

if($_SERVER['REQUEST_METHOD']==='POST'){
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $email = $_POST['email'];

    try{
        $connection = new Connection();
        $pdo = $connection->connect();

        $sql = "INSERT INTO usuarios(username,password,email) VALUES(:username, :password, :email)";
        $stmt = $pdo -> prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $password,
            ':email' => $email
        ]);
        
        echo"<script>
            alert('Usuario registrado correctamente.') ;
            window.location.href = '../index.php';
        </script>";

        echo " ".$username;

        }catch(\Throwable $th){

        echo"<script>
            alert('Error al registrar el usuario: " . addslashes($th->getMessage()) . "');
            window.location.href = '../index.php';
        </script>";
    }


}