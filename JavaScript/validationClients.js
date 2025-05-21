document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('nuevoForm');

    form.addEventListener('submit', function (e) {
        // Obtener valores
        const firstName = document.getElementById('first_name_new').value.trim();
        const lastName = document.getElementById('last_name_new').value.trim();
        const email = document.getElementById('email_new').value.trim();
        const phone = document.getElementById('phone_new').value.trim();
        const address = document.getElementById('address_new').value.trim();

        // Validar nombre y apellido: solo letras y al menos 2 caracteres
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

        if (!nameRegex.test(firstName)) {
            alert('Por favor, ingresa un nombre válido (solo letras, mínimo 2 caracteres).');
            e.preventDefault();
            return;
        }

        if (!nameRegex.test(lastName)) {
            alert('Por favor, ingresa un apellido válido (solo letras, mínimo 2 caracteres).');
            e.preventDefault();
            return;
        }
        
        // Validar email si no está vacío
        if (email.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                e.preventDefault();
                return;
            }
        }

        // Validar teléfono si no está vacío
        if (phone.length > 0) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Por favor, ingresa un teléfono valido. (10 digitos)');
                e.preventDefault();
                return;
            }
        }
        
    });
});
