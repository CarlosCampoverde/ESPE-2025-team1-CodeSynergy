<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar que se envió el ID del cliente
    if (!isset($_POST['id_client'])) {
        echo json_encode(['success' => false, 'error' => 'Falta el ID del cliente']);
        exit;
    }

    $id_client = $_POST['id_client'];

    try {
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // Verificar si el cliente tiene eventos asociados
        $sql_events = "SELECT COUNT(*) FROM events WHERE client_id = :id_client";
        $stmt_events = $pdo->prepare($sql_events);
        $stmt_events->execute([':id_client' => $id_client]);
        $event_count = $stmt_events->fetchColumn();

        // Verificar si el cliente tiene comentarios asociados
        $sql_comments = "SELECT COUNT(*) FROM comments WHERE client_id = :id_client";
        $stmt_comments = $pdo->prepare($sql_comments);
        $stmt_comments->execute([':id_client' => $id_client]);
        $comment_count = $stmt_comments->fetchColumn();

        if ($event_count > 0 || $comment_count > 0) {
            echo json_encode(['success' => false, 'error' => 'No se puede eliminar el cliente porque tiene eventos o comentarios asociados']);
            exit;
        }

        // Eliminar el cliente
        $sql = "DELETE FROM clients WHERE id = :id_client";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id_client' => $id_client]);

        echo json_encode(['success' => true]);

    } catch (\Throwable $th) {
        echo json_encode(['success' => false, 'error' => 'Error al eliminar: ' . $th->getMessage()]);
    }
}
?>