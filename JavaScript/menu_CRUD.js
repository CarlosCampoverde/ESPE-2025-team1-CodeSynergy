const tbody = document.getElementById('tabla_menu');

// funcion para cargar los menus
function cargar_menus() {
  fetch('../php/adm_menu_read.php')
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return response.json();
    })
    .then(data => {
      tbody.innerHTML = ''; 
console.log("ingresa hasta carga menu");
      // crea la tabla y sube los datos
      data.forEach((menus) => {
        const fila = `
          <tr>
            <th scope="row">${menus.id}</th>
            <td>${menus.name || ''}</td>
            <td>${menus.description || ''}</td>
            <td>${menus.price_per_person || ''}</td>
            <td class="text-center">
              <button class="btn btn-outline-danger del-icon" data-id="${menus.id}">
                <span class="fa fa-trash-o"></span>
              </button>
              <button class="btn btn-outline-success edit-icon" data-id="${menus.id}">
                <span class="fa fa-pencil"></span>
              </button>
            </td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });
    })
    .catch(error => {
      console.error('Error al cargar los vehículos:', error);
    });
}

// funcion editar que puede editar y eliminar 
tbody.addEventListener('click', function (e) {
  if (e.target.closest('.edit-icon')) {
    const fila = e.target.closest('tr');

    const id_menu = fila.children[0].textContent;
    const name = fila.children[1].textContent;
    const description = fila.children[2].textContent;
    const price_per_person = fila.children[3].textContent;

    document.getElementById('id_menu_edit').value = id_menu; 
    document.getElementById('name_edit').value = name;
    document.getElementById('description_edit').value = description;
    document.getElementById('price_per_person_edit').value = price_per_person;

    const modal = new bootstrap.Modal(document.getElementById('editarModal'));
    modal.show();
  }

  //clic en eliminar
  if (e.target.closest('.del-icon')) {
    const fila = e.target.closest('tr');
    const id_menu = fila.children[0].textContent;

    document.getElementById('placaEliminar').textContent = id_menu;

    const modal = new bootstrap.Modal(document.getElementById('eliminarModal'));
    modal.show();

    // confirmar eliminacion
    document.getElementById('confirmarEliminar').addEventListener('click', function() {
      console.log(`Eliminando el menú: ${id_menu}`);
      modal.hide();
    });
  }
});

document.addEventListener('DOMContentLoaded', cargar_menus);
