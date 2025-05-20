<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar que se envió el ID del menú
    if (!isset($_POST['id_menu'])) {
        echo json_encode(['success' => false, 'error' => 'Falta el ID del menú']);
        exit;
    }

    $id_menu = $_POST['id_menu'];

    try {
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // Consulta SQL para eliminar
         $sql = "UPDATE menus SET is_active = CASE 
                    WHEN is_active = 1 THEN 0
                    ELSE 1 END
            WHERE id = :id_menu";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id_menu' => $id_menu]);

        echo json_encode(['success' => true]);

    } catch (\Throwable $th) {
        echo json_encode(['success' => false, 'error' => 'Error al eliminar: ' . $th->getMessage()]);
    }
}
?>