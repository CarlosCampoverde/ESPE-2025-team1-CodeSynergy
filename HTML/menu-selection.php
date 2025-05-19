<?php
session_start();


// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['username'])) {
    header('Location: ../index.php');
    
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selección de Menú</title>
    <link rel="stylesheet" href="../CSS/menu-styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Configuración de tu Menú</h1>
        
        <div class="menu-type-selector">
            <button id="btn-predetermined" class="active">Menús Predeterminados</button>
            <button id="btn-custom">Personalizar Menú</button>
        </div>

        <div id="predetermined-section" class="menu-section">
            <h2>Selecciona un menú prediseñado</h2>
            <div id="predetermined-options" class="menu-options">
                <!-- Opciones se cargan por JS -->
            </div>
        </div>

        <div id="custom-section" class="menu-section" style="display:none;">
            <h2>Arma tu menú personalizado</h2>
            <div id="custom-options">
                <!-- Categorías e items se cargan por JS -->
            </div>
        </div>

        <div class="form-footer">
            <div class="people-count">
                <label for="people-count">Número de personas:</label>
                <input type="number" id="people-count" min="1" value="1">
            </div>
            <button id="btn-continue" class="btn-primary">Continuar</button>
        </div>
    </div>

    <script src="../JavaScript/menu-scripts.js"></script>
</body>
</html>

