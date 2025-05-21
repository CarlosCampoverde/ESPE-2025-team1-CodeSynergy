const tbody = document.getElementById('tabla_menu_items');

// funcion para cargar los menus
function cargar_menu_items() {
    fetch('../php/adm_menu_item_read.php')
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return response.json();
    })
    .then(data => {
      tbody.innerHTML = ''; 
        console.log("ingresa hasta carga menu");
      // crea la tabla y sube los datos
      data.forEach((menu_items) => {
        const fila = `
                    <tr>
                        <th scope="row" style="width:80px;">${menu_items.id}</th>
                        <td style="width:250px;">${menu_items.name || ''}</td>
                        <td style="width:400px;">${menu_items.description || ''}</td>
                        <td style="width:150px;">${menu_items.price || ''}</td>
                        <td style="width:150px;">${menu_items.category_name || 'Sin categoría'}</td>
                        <td class="text-center" style="width:100px;">${menu_items.is_active == 1 ? 'Sí' : 'No'}</td>
                        <td class="text-center" style="width:150px;">
                            <button class="btn btn-outline-danger del-icon" data-id="${menu_items.id}" data-name="${menu_items.name}">
                                <span class="fa fa-trash-o"></span>
                            </button>
                            <button class="btn btn-outline-success edit-icon" data-id="${menu_items.id}">
                                <span class="fa fa-pencil"></span>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => {
            console.error('Error al cargar los ítems del menú:', error);
        });
}

// Manejar clics en botones de editar y eliminar
tbody.addEventListener('click', function (e) {
    if (e.target.closest('.edit-icon')) {
        const fila = e.target.closest('tr');
        const id = fila.children[0].textContent;
        const name = fila.children[1].textContent;
        const description = fila.children[2].textContent;
        const price = fila.children[3].textContent;
        const category_name = fila.children[4].textContent;
        const is_active = fila.children[5].textContent === 'Sí' ? '1' : '0';

        document.getElementById('id_edit').value = id;
        document.getElementById('name_edit').value = name;
        document.getElementById('description_edit').value = description;
        document.getElementById('price_edit').value = price;
        document.getElementById('is_active_edit').value = is_active;

        // Seleccionar la categoría correspondiente
        const categorySelect = document.getElementById('category_id_edit');
        fetch('../php/adm_menu_item_read.php')
            .then(response => response.json())
            .then(data => {
                const item = data.find(i => i.id == id);
                if (item) {
                    categorySelect.value = item.category_id;
                }
            });

        const modal = new bootstrap.Modal(document.getElementById('editarModal'));
        modal.show();
    }

    if (e.target.closest('.del-icon')) {
        const id = e.target.closest('.del-icon').getAttribute('data-id');
        const name = e.target.closest('.del-icon').getAttribute('data-name');

        document.getElementById('nombreEliminar').textContent = name;

        const modal = new bootstrap.Modal(document.getElementById('eliminarModal'));
        modal.show();

        // Confirmar eliminación
        document.getElementById('confirmarEliminar').onclick = function () {
            fetch('../php/adm_menu_item_delete.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${id}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Ítem de menú eliminado correctamente.');
                        cargar_menu_items();
                    } else {
                        alert('Error al eliminar: ' + data.error);
                    }
                    modal.hide();
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    alert('Error al eliminar el ítem.');
                    modal.hide();
                });
        };
    }
});

document.addEventListener('DOMContentLoaded', cargar_menu_items);