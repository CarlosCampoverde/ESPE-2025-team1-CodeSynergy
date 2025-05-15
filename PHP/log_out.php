<?php
    session_start();
    session_unset();   // Elimina todas las variables de la sesion
    session_destroy(); // Destruye 

    if (session_status() == PHP_SESSION_NONE) {
        echo "<script>
                alert('Usuario cerró sesión correctamente.');
                window.location.href = '../index.php';
              </script>";
    }   
    
    header('Location: ../index.php'); // Redirige al inicio
    exit;
?>