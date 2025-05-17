<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Validar todos enviados
    if (
        !isset($_POST['name_menu'], $_POST['description'], $_POST['price_per_person'], $_POST['id_menu'])
    ) {
        die("Faltan datos del formulario.");
    }

    // Obtener los datos 
    $id_menu = $_POST['id_menu']; 
    $name_menu = $_POST['name_menu'];
    $description = $_POST['description'];
    $price_per_person = $_POST['price_per_person'];

    try {
        // Conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        //  SQL para actualizar
        $sql = "UPDATE menus
                SET name = :name_menu,
                    description = :description,
                    price_per_person = :price_per_person
                WHERE id = :id_menu";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name_menu'        => $name_menu,
            ':description'      => $description,
            ':price_per_person' => $price_per_person,
            ':id_menu'          => $id_menu
        ]);


        echo "<script>
            alert('Menú actualizado correctamente.');
            window.location.href = '../html/menu.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al actualizar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/menu.php';
        </script>";
    }
}
?>
