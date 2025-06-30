$(document).ready(function() {
    const quoteId = new URLSearchParams(window.location.search).get('quoteId');
    
    // Cargar datos de la cotización
    $.ajax({
        url: `../php/get-quote-details.php?id=${quoteId}`,
        success: function(response) {
            if (response.success) {
                renderQuote(response.data);
            }
        }
    });

    $('#btn-pdf').click(function() {
        window.open(`../php/generate-pdf.php?id=${quoteId}`, '_blank');
    });
});

function renderQuote(data) {
    let html = `
        <h2>Resumen de tu cotización #${data.id}</h2>
        <p><strong>Evento:</strong> ${data.event_type} para ${data.peopleCount} personas</p>
        <h3>Menú: ${data.menuName}</h3>
        <p>${data.menuDescription || ''}</p>
        <p>Precio: $${data.menuTotal}</p>
    `;

    if (data.services && data.services.length > 0) {
        html += `<h3>Servicios Adicionales:</h3><ul>`;
        data.services.forEach(service => {
            html += `<li>${service.name} (${service.quantity}): $${service.subtotal}</li>`;
        });
        html += `</ul>`;
    }

    html += `<h3>Total: $${data.total}</h3>`;
    $('#quote-summary').html(html);
}