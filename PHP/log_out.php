<?php
    session_start();
    session_unset();   // Elimina todas las variables de la sesion
    session_destroy(); // Destruye 

    header('Location: ../index.php'); // Redirige al inicio
    exit;
?>