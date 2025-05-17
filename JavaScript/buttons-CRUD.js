console.log("JS cargado correctamente");

// Esperamos a que el DOM esté listo
$(document).ready(function () {

    // Funcionalidad para el botón de Editar (delegado)
    $(document).on("click", ".btn-outline-success", function () {
        var fila = $(this).closest("tr");
        var placa = fila.find("td").eq(2).text(); 
        var estado = fila.find("td").eq(3).text(); 
        var capacidad = fila.find("td").eq(4).text(); 
        var asignado = fila.find("td").eq(5).text();   

        $("#placaEditar").val(placa);
        $("#estadoEditar").val(estado);
        $("#capacidadEditar").val(capacidad);
        $("#asignadoEditar").val(asignado);

        $('#editarModal').modal('show');
    });

    // Funcionalidad para el botón de Eliminar (delegado)
    $(document).on("click", ".btn-outline-danger", function () {
        console.log("JS cargado correctamente btn eliminar");

        var fila = $(this).closest("tr");
        var placa = fila.find("td").eq(2).text();

        $("#placaEliminar").text(placa);
        $('#eliminarModal').modal('show');

        // Evita múltiples bindings
        $("#confirmarEliminar").off("click").on("click", function () {
            fila.remove();
            $('#eliminarModal').modal('hide');
        });
    });

    // Guardar cambios del modal de edición
    $("#guardarEditar").click(function () {
        var placa = $("#placaEditar").val();
        var estado = $("#estadoEditar").val();
        var capacidad = $("#capacidadEditar").val();
        var asignado = $("#asignadoEditar").val();

        var fila = $("tr").filter(function () {
            return $(this).find("td").eq(2).text() === placa;
        });

        fila.find("td").eq(3).text(estado);
        fila.find("td").eq(4).text(capacidad);
        fila.find("td").eq(5).text(asignado);

        $('#editarModal').modal('hide');
    });

    // Guardar nuevo vehículo
    $("#guardarNuevo").click(function () {
        console.log("JS cargado correctamente btn nuevo");

        var placa = $("#placaNuevo").val();
        var estado = $("#estadoNuevo").val();
        var capacidad = $("#capacidadNuevo").val();
        var asignado = $("#asignadoNuevo").val();

        var nuevaFila = `
            <tr>
                <th scope='row'></th>
                <td class='text-center'>
                    <button class='btn btn-outline-danger del-icon'><span class='fa fa-trash-o'></span></button>
                    <button class='btn btn-outline-success'><span class='fa fa-pencil'></span></button>
                </td>
                <td>${placa}</td>
                <td>${estado}</td>
                <td>${capacidad}</td>
                <td>${asignado}</td>
                <td>ACTIVO</td>
                <td>5 personas</td>
                <td>Transporte de comida</td>
                <td>Azul</td>
            </tr>`;

        $(".cust-table tbody").append(nuevaFila);
        $('#nuevoModal').modal('hide');
    });
});
