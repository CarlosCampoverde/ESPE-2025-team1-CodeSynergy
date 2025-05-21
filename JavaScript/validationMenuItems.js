document.addEventListener('DOMContentLoaded', function () {
    function validarFormulario(form, ids) {
        const name = document.getElementById(ids.name).value.trim();
        const description = document.getElementById(ids.description).value.trim();
        const price = document.getElementById(ids.price).value.trim();
        const category = document.getElementById(ids.category).value;
        const isActive = document.getElementById(ids.is_active).value;

        // Nombre: mínimo 2 caracteres y caracteres válidos
        const nameRegex = /^[a-zA-Z0-9\s\-,]{2,}$/;
        if (!nameRegex.test(name)) {
            alert('Por favor, ingresa un nombre válido (mínimo 2 caracteres, solo letras, números, espacios, coma o guion).');
            return false;
        }

        // Descripción: mínimo 10 caracteres
        if (description.length < 10) {
            alert('La descripción debe tener al menos 10 caracteres.');
            return false;
        }

        // Precio: número decimal positivo mayor a 0
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            alert('Por favor, ingresa un precio válido mayor que cero.');
            return false;
        }

        // Categoría: debe estar seleccionada
        if (!category || category === '') {
            alert('Por favor, selecciona una categoría.');
            return false;
        }

        // Activo: solo "0" o "1"
        if (isActive !== '0' && isActive !== '1') {
            alert('Por favor, selecciona un estado válido para el campo Activo.');
            return false;
        }

        return true;
    }

    // Validar formulario Nuevo Ítem
    document.getElementById('nuevoForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            name: 'name_new',
            description: 'description_new',
            price: 'price_new',
            category: 'category_id_new',
            is_active: 'is_active_new'
        })) {
            e.preventDefault();
        }
    });

    // Validar formulario Editar Ítem
    document.getElementById('editForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            name: 'name_edit',
            description: 'description_edit',
            price: 'price_edit',
            category: 'category_id_edit',
            is_active: 'is_active_edit'
        })) {
            e.preventDefault();
        }
    });
});
