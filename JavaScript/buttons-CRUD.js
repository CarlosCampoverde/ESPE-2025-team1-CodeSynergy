// obtener referencia al cuerpo de la tabla
const tbody = document.getElementById('tablaVehiculosBody');

// funcion para cargar los vehiculos
function cargarVehiculos() {
  fetch('../php/listar_vehiculos.php')
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return response.json();
    })
    .then(data => {
      tbody.innerHTML = ''; // limpiar tabla

      data.forEach((vehiculo) => {
        const fila = `
          <tr>
            <th scope="row">${vehiculo.id}</th>
            <td>${vehiculo.tipo_vehiculo || ''}</td>
            <td>${vehiculo.placa || ''}</td>
            <td>${vehiculo.estado || ''}</td>
            <td>${vehiculo.capacidad || ''}</td>
            <td>${vehiculo.uso_asignado || ''}</td>
            <td>${vehiculo.color || ''}</td>
            <td class="text-center">
              <button class="btn btn-outline-danger del-icon" data-id="${vehiculo.id}">
                <span class="fa fa-trash-o"></span>
              </button>
              <button class="btn btn-outline-success edit-icon" data-id="${vehiculo.id}">
                <span class="fa fa-pencil"></span>
              </button>
            </td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });
    })
    .catch(error => {
      console.error('Error al cargar los vehiculos:', error);
    });
}

// evento para abrir el modal de editar
tbody.addEventListener('click', function (e) {
  if (e.target.closest('.edit-icon')) {
    const fila = e.target.closest('tr');

    const tipo_vehiculo = fila.children[1].textContent;
    const placa = fila.children[2].textContent;
    const estado = fila.children[3].textContent;
    const capacidad = fila.children[4].textContent;
    const asignado = fila.children[5].textContent;
    const color = fila.children[6].textContent;

    document.getElementById('tipoEditar').value = tipo_vehiculo;
    document.getElementById('placaEditar').value = placa;
    document.getElementById('estadoEditar').value = estado;
    document.getElementById('capacidadEditar').value = capacidad;
    document.getElementById('asignadoEditar').value = asignado;
    document.getElementById('colorEditar').value = color;

    const modal = new bootstrap.Modal(document.getElementById('editarModal'));
    modal.show();
  }
});

// evento para abrir el modal de eliminar
tbody.addEventListener('click', function (e) {
  if (e.target.closest('.del-icon')) {
    const fila = e.target.closest('tr');
    const placa = fila.children[2].textContent;

    document.getElementById('placaEliminar').textContent = placa;

    const modal = new bootstrap.Modal(document.getElementById('eliminarModal'));
    modal.show();
  }
});

// ejecutar al cargar la pagina
document.addEventListener('DOMContentLoaded', cargarVehiculos);
