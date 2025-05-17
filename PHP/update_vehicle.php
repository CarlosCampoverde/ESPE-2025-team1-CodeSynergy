<?php
require_once 'Connection.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // validar que todos los datos hayan sido enviados
    if (
        !isset($_POST['tipo_vehiculo'], $_POST['placa'], $_POST['estado'],
                $_POST['capacidad'], $_POST['asignado'], $_POST['color'])
    ) {
        die("Faltan datos del formulario.");
    }

    // obtener los datos del formulario
    $tipo_vehiculo = $_POST['tipo_vehiculo'];
    $placa = $_POST['placa']; // usamos la placa para identificar el registro
    $estado = $_POST['estado'];
    $capacidad = $_POST['capacidad'];
    $uso_asignado = $_POST['asignado'];
    $color = $_POST['color'];

    try {
        // conectar con la base de datos
        $conexion = new Connection();
        $pdo = $conexion->connect();

        // consulta SQL preparada para actualizar
        $sql = "UPDATE vehiculos
                SET tipo_vehiculo = :tipo_vehiculo,
                    estado = :estado,
                    capacidad = :capacidad,
                    uso_asignado = :uso_asignado,
                    color = :color
                WHERE placa = :placa";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':tipo_vehiculo' => $tipo_vehiculo,
            ':estado'        => $estado,
            ':capacidad'     => $capacidad,
            ':uso_asignado'  => $uso_asignado,
            ':color'         => $color,
            ':placa'         => $placa
        ]);

        // mensaje de exito
        echo "<script>
            alert('Vehiculo actualizado correctamente.');
            window.location.href = '../html/transporte.php';
        </script>";

    } catch (\Throwable $th) {
        $msg = json_encode("Error al actualizar: " . $th->getMessage());
        echo "<script>
            alert($msg);
            window.location.href = '../html/transporte.php';
        </script>";
    }
}
