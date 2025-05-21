<?php
require_once 'Connection.php';

if (!isset($_GET['quote_id'])) {
    header("Location: error.php?message=" . urlencode("Cotización no especificada"));
    exit;
}

$quote_id = $_GET['quote_id'];
$db = (new Connection())->connect();

// Obtener ruta del PDF
$stmt = $db->prepare("SELECT file_path FROM pdf_files WHERE quote_id = ? ORDER BY id DESC LIMIT 1");
$stmt->execute([$quote_id]);
$pdf = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$pdf || !file_exists($pdf['file_path'])) {
    header("Location: error.php?message=" . urlencode("PDF no encontrado"));
    exit;
}

// Configurar headers para descarga
header('Content-Description: File Transfer');
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="cotizacion_'.$quote_id.'.pdf"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($pdf['file_path']));

// Leer el archivo y enviarlo al navegador
readfile($pdf['file_path']);
exit;
?>