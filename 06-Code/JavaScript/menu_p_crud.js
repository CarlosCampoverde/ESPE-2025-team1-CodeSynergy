const tbody = document.getElementById('tabla_menu');

// Función de debounce para evitar múltiples solicitudes
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para cargar los menús con filtros
function cargar_menus() {
    const nameFilter = document.getElementById('name_filter')?.value || '';
    const typeFilter = document.getElementById('type_filter')?.value || '';
    const priceFilter = document.getElementById('price_filter')?.value || '';
    const statusFilter = document.getElementById('status_filter')?.value || '';

    const queryParams = new URLSearchParams({
        name: nameFilter,
        type: typeFilter,
        price: priceFilter,
        status: statusFilter
    });

    fetch(`../php/adm_menu_p_read.php?${queryParams}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            tbody.innerHTML = '';
            data.forEach((menu) => {
                const fila = `
                    <tr>
                        <th scope="row" style="width:80px;">${menu.id}</th> 
                        <td style="width:250px;">${menu.name || ''}</td>
                        <td style="width:300px;">${menu.description || ''}</td>
                        <td class="text-center" style="width:200px;">${menu.price_per_person || ''}</td> 
                        <td class="text-center" style="width:200px;">${menu.type || ''}</td>
                        <td class="text-center" style="width:200px;">${menu.is_active == 1 ? 'Activo' : 'Inactivo'}</td>
                        <td class="text-center" style="width:200px;">
                            <button class="btn btn-outline-danger del-icon" data-id="${menu.id}">
                                <span class="fa fa-trash-o"></span>
                            </button>
                            <button class="btn btn-outline-success edit-icon" data-id="${menu.id}">
                                <span class="fa fa-pencil"></span>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => {
            console.error('Error al cargar los menús:', error);
        });
}

// Detectar cambios en los filtros
document.getElementById('name_filter')?.addEventListener('input', debounce(cargar_menus, 300));
document.getElementById('type_filter')?.addEventListener('change', cargar_menus);
document.getElementById('price_filter')?.addEventListener('input', debounce(cargar_menus, 300));
document.getElementById('status_filter')?.addEventListener('change', cargar_menus);

// Manejo de botones de editar y eliminar
tbody.addEventListener('click', function (e) {
    if (e.target.closest('.edit-icon')) {
        const fila = e.target.closest('tr');

        const id_menu = fila.children[0].textContent;
        const name = fila.children[1].textContent;
        const description = fila.children[2].textContent;
        const price_per_person = fila.children[3].textContent;
        const type = fila.children[4].textContent.toLowerCase();

        document.getElementById('id_menu_edit').value = id_menu; 
        document.getElementById('name_edit').value = name;
        document.getElementById('description_edit').value = description;
        document.getElementById('price_per_person_edit').value = price_per_person;

        const typeSelect = document.getElementById('type_edit');
        typeSelect.value = (type === 'predetermined' || type === 'predefined') ? 'predefined' : 'customizable';

        const modal = new bootstrap.Modal(document.getElementById('editarModal'));
        modal.show();
    }

    if (e.target.closest('.del-icon')) {
        const fila = e.target.closest('tr');
        const id_menu = fila.children[0].textContent;
        const name_menu = fila.children[1].textContent;
        const status_menu = fila.children[5].textContent;


        document.getElementById('nombre_eliminar').textContent = name_menu;

        const modal = new bootstrap.Modal(document.getElementById('eliminarModal'));
        modal.show();

        // Confirmar eliminación (esto debe implementarse completamente)
        document.getElementById('confirmarEliminar').addEventListener('click', function() {
            fetch(`../php/adm_menu_p_delete.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id_menu=${id_menu}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if(status_menu==1){
                       alert('Menú desactivado correctamente.');
                    }else{
                      alert('Menú activado correctamente.');
                    }
                    
                    cargar_menus();
                } else {
                    alert('Error al eliminar el menú: ' + data.error);
                }
                modal.hide();
            })
            .catch(error => {
                console.error('Error al eliminar el menú:', error);
                alert('Error al eliminar el menú.');
            });
        }, { once: true }); // Escuchar solo una vez para evitar múltiples listeners
    }
});

// Cargar menús al iniciar
document.addEventListener('DOMContentLoaded', cargar_menus);