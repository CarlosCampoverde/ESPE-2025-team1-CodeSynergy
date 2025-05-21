document.addEventListener('DOMContentLoaded', function () {
    // Función para validar un formulario dado sus campos por IDs
    function validarFormulario(form, ids) {
        const firstName = document.getElementById(ids.first_name).value.trim();
        const lastName = document.getElementById(ids.last_name).value.trim();
        const email = document.getElementById(ids.email).value.trim();
        const phone = document.getElementById(ids.phone).value.trim();
        const address = document.getElementById(ids.address).value.trim();

        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

        if (!nameRegex.test(firstName)) {
            alert('Por favor, ingresa un nombre válido (solo letras, mínimo 2 caracteres).');
            return false;
        }

        if (!nameRegex.test(lastName)) {
            alert('Por favor, ingresa un apellido válido (solo letras, mínimo 2 caracteres).');
            return false;
        }

        if (email.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return false;
            }
        }

        if (phone.length > 0) {
            const phoneRegex = /^[0-9\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(phone)) {
                alert('Por favor, ingresa un teléfono válido (7 a 15 dígitos, puede incluir espacios, guiones o paréntesis).');
                return false;
            }
        }

        if (address.length > 0 && address.length < 5) {
            alert('La dirección debe tener al menos 5 caracteres si se ingresa.');
            return false;
        }

        return true;
    }

    // Validar formulario Nuevo Cliente
    document.getElementById('nuevoForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            first_name: 'first_name_new',
            last_name: 'last_name_new',
            email: 'email_new',
            phone: 'phone_new',
            address: 'address_new'
        })) {
            e.preventDefault();
        }
    });

    // Validar formulario Editar Cliente
    document.getElementById('editForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            first_name: 'first_name_edit',
            last_name: 'last_name_edit',
            email: 'email_edit',
            phone: 'phone_edit',
            address: 'address_edit'
        })) {
            e.preventDefault();
        }
    });
});
