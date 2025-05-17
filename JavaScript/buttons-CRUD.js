// obtener referencia al cuerpo de la tabla
const tbody = document.getElementById('tablaVehiculosBody');

// funcion para cargar los vehiculos
function cargarVehiculos() {
  fetch('../php/listar_vehiculos.php') // ruta correcta para obtener datos en JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      // limpiar el tbody antes de cargar nuevas filas
      tbody.innerHTML = '';

      // recorrer cada vehiculo y crear su fila
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

// ejecutar la funcion al cargar la pagina
document.addEventListener('DOMContentLoaded', cargarVehiculos);
