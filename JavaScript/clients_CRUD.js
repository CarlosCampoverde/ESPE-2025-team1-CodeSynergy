const tbody = document.getElementById('tabla_clientes');

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

// Función para cargar los clientes con filtros
function cargar_clientes() {
    const nameFilter = document.getElementById('name_filter')?.value || '';
    const emailFilter = document.getElementById('email_filter')?.value || '';
    const phoneFilter = document.getElementById('phone_filter')?.value || '';

    const queryParams = new URLSearchParams({
        name: nameFilter,
        email: emailFilter,
        phone: phoneFilter
    });

    fetch(`../php/adm_clients_read.php?${queryParams}`)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(data => {
            tbody.innerHTML = '';
            data.forEach((client) => {
                const fila = `
                    <tr>
                        <th scope="row" style="width:75px;">${client.id}</th>
                        <td style="width:200px;">${client.first_name || ''}</td>
                        <td style="width:200px;">${client.last_name || ''}</td>
                        <td style="width:250px;">${client.email || ''}</td>
                        <td style="width:150px;">${client.phone || ''}</td>
                        <td style="width:250px;">${client.address || ''}</td>
                        <td class="text-center" style="width:200px;">
                            <button class="btn btn-outline-danger del-icon" data-id="${client.id}">
                                <span class="fa fa-trash-o"></span>
                            </button>
                            <button class="btn btn-outline-success edit-icon" data-id="${client.id}">
                                <span class="fa fa-pencil"></span>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => {
            console.error('Error al cargar los clientes:', error);
        });
}

// Detectar cambios en los filtros
document.getElementById('name_filter')?.addEventListener('input', debounce(cargar_clientes, 300));
document.getElementById('email_filter')?.addEventListener('input', debounce(cargar_clientes, 300));
document.getElementById('phone_filter')?.addEventListener('input', debounce(cargar_clientes, 300));

// Manejo de botones de editar y eliminar
tbody.addEventListener('click', function (e) {
    if (e.target.closest('.edit-icon')) {
        const fila = e.target.closest('tr');

        const id_client = fila.children[0].textContent;
        const first_name = fila.children[1].textContent;
        const last_name = fila.children[2].textContent;
        const email = fila.children[3].textContent;
        const phone = fila.children[4].textContent;
        const address = fila.children[5].textContent;

        document.getElementById('id_client_edit').value = id_client;
        document.getElementById('first_name_edit').value = first_name;
        document.getElementById('last_name_edit').value = last_name;
        document.getElementById('email_edit').value = email;
        document.getElementById('phone_edit').value = phone;
        document.getElementById('address_edit').value = address;

        const modal = new bootstrap.Modal(document.getElementById('editarModal'));
        modal.show();
    }

    if (e.target.closest('.del-icon')) {
        const fila = e.target.closest('tr');
        const id_client = fila.children[0].textContent;
        const first_name = fila.children[1].textContent;
        const last_name = fila.children[2].textContent;

        document.getElementById('nombre_eliminar').textContent = `${first_name} ${last_name}`;

        const modal = new bootstrap.Modal(document.getElementById('eliminarModal'));
        modal.show();

        // Confirmar eliminación
        document.getElementById('confirmarEliminar').addEventListener('click', function() {
            fetch(`../php/adm_clients_delete.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id_client=${id_client}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cliente eliminado correctamente.');
                    cargar_clientes();
                } else {
                    alert('Error al eliminar el cliente: ' + data.error);
                }
                modal.hide();
            })
            .catch(error => {
                console.error('Error al eliminar el cliente:', error);
                alert('Error al eliminar el cliente.');
            });
        }, { once: true }); // Escuchar solo una vez para evitar múltiples listeners
    }
});

// Cargar clientes al iniciar
document.addEventListener('DOMContentLoaded', cargar_clientes);