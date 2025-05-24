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
    <title>Servicios Adicionales</title>
    <link rel="stylesheet" href="../CSS/servicios-style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Servicios Adicionales</h1>
        
        <!-- Barra de progreso -->
        <div class="progress-steps">
            <div class="step completed">Menú</div>
            <div class="step active">Servicios</div>
            <div class="step">Confirmación</div>
        </div>

        <!-- Sección de Servicios -->
        <div id="services-section">
            <h2>Selecciona servicios para tu evento</h2>
            <div id="services-options">
                <!-- Opciones cargadas por JavaScript -->
            </div>
        </div>

        <!-- Resumen -->
        <div id="summary-section">
            <h2>Resumen de tu selección</h2>
            <div id="menu-summary"></div>
            <div id="services-summary"></div>
            <div id="total-summary"></div>
        </div>

        <!-- Botones -->
        <div class="form-footer">
            <button id="btn-back" class="btn-secondary">← Volver</button>
            <button id="btn-continue" class="btn-primary">Continuar a Confirmación</button>
        </div>
    </div>

    <script src="../javascript/servicios_scripts.js"></script>
</body>
</html>