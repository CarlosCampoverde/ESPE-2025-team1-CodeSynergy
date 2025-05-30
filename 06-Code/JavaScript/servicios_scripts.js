$(document).ready(function() {
    // Obtener datos de la URL (ej: ?selection=123)
    const urlParams = new URLSearchParams(window.location.search);
    const selectionId = urlParams.get('selection');

    // Cargar servicios disponibles
    loadServices();

    // Cargar resumen del menú seleccionado
    loadMenuSummary(selectionId);

    // Manejadores de eventos
    $('#btn-back').click(() => window.history.back());
    $('#btn-continue').click(() => saveQuote());
});

function loadServices() {
    $('#services-options').html('<div class="loading">Cargando servicios...</div>');

    $.ajax({
        url: '../php/get-services.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data) {
                renderServices(response.data);
            } else {
                showError('Error al cargar servicios');
            }
        },
        error: function(xhr, status, error) {
            showError('Error de conexión: ' + error);
        }
    });
}

function renderServices(services) {
    const container = $('#services-options');
    container.empty();

    services.forEach(service => {
        const serviceCard = $(`
            <div class="service-card" data-id="${service.id}">
                <h3>${service.name}</h3>
                <p>${service.description || ''}</p>
                <p class="price">$${service.unit_price.toFixed(2)} ${service.price_type === 'per_hour' ? '/hora' : ''}</p>
                <div class="service-controls">
                    <input type="number" min="0" max="10" value="0" class="service-quantity">
                </div>
            </div>
        `);

        // Actualizar resumen al cambiar cantidad
        serviceCard.find('.service-quantity').change(function() {
            updateServicesSummary();
        });

        container.append(serviceCard);
    });
}

function loadMenuSummary(selectionId) {
    $.ajax({
        url: `../php/get-selection.php?id=${selectionId}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                $('#menu-summary').html(`
                    <h3>Menú ${response.data.type === 'custom' ? 'Personalizado' : response.data.menuName}</h3>
                    <p>${response.data.peopleCount} personas × $${response.data.pricePerPerson} = $${response.data.subtotal}</p>
                `);
            }
        }
    });
}

function updateServicesSummary() {
    let servicesHTML = '<h3>Servicios seleccionados:</h3>';
    let totalServices = 0;

    $('.service-card').each(function() {
        const serviceId = $(this).data('id');
        const quantity = parseInt($(this).find('.service-quantity').val()) || 0;
        
        if (quantity > 0) {
            const price = parseFloat($(this).find('.price').text().replace('$', ''));
            const subtotal = price * quantity;
            totalServices += subtotal;

            servicesHTML += `
                <p>${$(this).find('h3').text()} (${quantity}): $${subtotal.toFixed(2)}</p>
            `;
        }
    });

    $('#services-summary').html(servicesHTML || '<p>No hay servicios seleccionados</p>');
    $('#total-summary').html(`<strong>Total estimado: $${totalServices.toFixed(2)}</strong>`);
}


function saveQuote() {
    const services = [];
    const menus = [];
    let isValid = true;

    // 1. Recoger servicios seleccionados (ya lo tienes)
    $('.service-card').each(function() {
        const quantity = parseInt($(this).find('.service-quantity').val()) || 0;
        if (quantity > 0) {
            services.push({
                id: $(this).data('id'),
                quantity: quantity
            });
        }
    });

    // 2. Recoger menús seleccionados (¡NUEVO!)
    $('.menu-card').each(function() {
        const peopleCount = parseInt($(this).find('.people-count').val()) || 0;
        if (peopleCount > 0) {
            menus.push({
                id: $(this).data('id'),
                people: peopleCount
            });
        }
    });

    // 3. Validación (opcional)
    if (menus.length === 0 && services.length === 0) {
        alert("Selecciona al menos un menú o servicio");
        return;
    }

    // 4. Enviar datos al servidor
    $('#btn-continue').prop('disabled', true).text('Guardando...');
    
    $.ajax({
        url: baseUrl + '/save-quote.php',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            selectionId: new URLSearchParams(window.location.search).get('selection'),
            eventId: 1, // Reemplaza con el ID real del evento (puedes obtenerlo de un campo oculto o de la URL)
            menus: menus,
            services: services
        }),
        success: function(response) {
            if (response.success) {
                window.location.href = `confirmacion.html?quoteId=${response.quoteId}`;
            } else {
                alert(response.error || 'Error al guardar');
            }
        },
        error: function() {
            alert('Error de conexión');
        },
        complete: function() {
            $('#btn-continue').prop('disabled', false).text('Continuar');
        }
    });
}

function showError(message) {
    alert('Error: ' + message);
}