<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Validar todos enviados
    if (
        !isset($_POST['name_menu'], $_POST['description'], $_POST['price_per_person'], $_POST['type'], $_POST['id_menu'])
    ) {
        die("Faltan datos del formulario.");
    }

    // Obtener los datos
    $id_menu = $_POST['id_menu'];
    $name_menu = $_POST['name_menu'];
    $description = $_POST['description'];
    $price_per_person = $_POST['price_per_person'];
    $type = $_POST['type'];

    try {
        // Conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // SQL para actualizar
        $sql = "UPDATE menus
                SET name = :name_menu,
                    description = :description,
                    price_per_person = :price_per_person,
                    type = :type
                WHERE id = :id_menu";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name_menu'        => $name_menu,
            ':description'      => $description,
            ':price_per_person' => $price_per_person,
            ':type'             => $type,
            ':id_menu'          => $id_menu
        ]);

        echo "<script>
            alert('Menú actualizado correctamente.');
            window.location.href = '../html/menu.php'; // Redirigir a la página de menús
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al actualizar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu.php'; // Redirigir en caso de error
        </script>";
    }
}
?>
