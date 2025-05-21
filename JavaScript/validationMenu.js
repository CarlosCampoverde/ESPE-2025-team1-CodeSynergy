document.addEventListener('DOMContentLoaded', function () {
    function validarFormulario(form, ids) {
        const name = document.getElementById(ids.name).value.trim();
        const description = document.getElementById(ids.description).value.trim();
        const price = document.getElementById(ids.price).value.trim();
        const type = document.getElementById(ids.type).value;

        // Validar nombre: mínimo 3 caracteres, letras, números, espacios, guiones y comas
        const nameRegex = /^[a-zA-Z0-9\s\-,]{3,}$/;
        if (!nameRegex.test(name)) {
            alert('Por favor, ingresa un nombre válido para el menú (mínimo 3 caracteres, solo letras, números, espacios, comas o guiones).');
            return false;
        }

        // Validar descripción: mínimo 10 caracteres
        if (description.length < 10) {
            alert('La descripción debe tener al menos 10 caracteres.');
            return false;
        }

        // Validar precio: decimal positivo mayor a 0, con máximo 2 decimales
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            alert('Por favor, ingresa un precio válido mayor que cero.');
            return false;
        }
        // Validar que tenga máximo 2 decimales
        if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            alert('El precio puede tener hasta dos decimales como máximo.');
            return false;
        }

        // Validar tipo: solo "predetermined" o "customizable"
        if (type !== 'predetermined' && type !== 'customizable') {
            alert('Por favor, selecciona un tipo válido para el menú.');
            return false;
        }

        return true;
    }

    // Validar formulario Nuevo Menú
    document.getElementById('nuevoForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            name: 'name_new',
            description: 'description_new',
            price: 'price_per_person_new',
            type: 'type_edit'  // Nota: el select tiene id="type_edit" en ambos modales
        })) {
            e.preventDefault();
        }
    });

    // Validar formulario Editar Menú
    document.getElementById('editForm').addEventListener('submit', function (e) {
        if (!validarFormulario(this, {
            name: 'name_edit',
            description: 'description_edit',
            price: 'price_per_person_edit',
            type: 'type_edit'  // Mismo id para el select en editar modal
        })) {
            e.preventDefault();
        }
    });
});
