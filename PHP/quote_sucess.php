<?php
// quote_success.php
require_once 'Connection.php';

$quote_id = $_GET['quote_id'] ?? null;
$pdf_filename = $_GET['pdf'] ?? null;

if (!$quote_id || !$pdf_filename) {
    header("Location: error.php?message=Cotización no encontrada");
    exit;
}

// Registrar en logs de acceso
$db = (new Connection())->connect();
$stmt = $db->prepare("INSERT INTO access_logs (user_id, action, description) VALUES (?, ?, ?)");
$stmt->execute([1, 'download_quote', 'El cliente descargó la cotización #'.$quote_id]);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización Generada</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script>
        // Descargar automáticamente el PDF después de 1 segundo
        setTimeout(function() {
            window.location.href = "../pdfs/<?= $pdf_filename ?>";
        }, 1000);
        
        // Redirigir al formulario después de 5 segundos
        setTimeout(function() {
            window.location.href = "../html/quote_form.html";
        }, 5000);
    </script>
</head>
<body>
    <div class="container">
        <h1>¡Cotización Generada Exitosamente!</h1>
        
        <div class="success-message">
            <p>Tu cotización #<?= $quote_id ?> ha sido generada correctamente.</p>
            <p>El PDF se descargará automáticamente en unos segundos.</p>
            <p>Serás redirigido al formulario inicial en 5 segundos.</p>
            
            <div class="actions">
                <a href="../pdfs/<?= $pdf_filename ?>" class="btn" download>Descargar PDF Ahora</a>
                <a href="../html/quote_form.html" class="btn">Volver al Formulario</a>
            </div>
        </div>
    </div>
</body>
</html>