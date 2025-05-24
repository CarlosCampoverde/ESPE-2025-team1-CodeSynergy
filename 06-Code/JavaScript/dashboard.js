document.addEventListener('DOMContentLoaded', function() {
    // Debounce para búsqueda
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

    // Cargar años para el selector
    function loadYears() {
        fetch('../php/adm_dashboard_charts.php?type=years')
            .then(response => response.json())
            .then(data => {
                const yearSelector = document.getElementById('yearSelector');
                data.years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelector.appendChild(option);
                });
                yearSelector.value = new Date().getFullYear();
                loadQuotesByMonth(yearSelector.value);
            });
    }

    // Gráfico de cotizaciones por mes
    function loadQuotesByMonth(year) {
        fetch(`../php/adm_dashboard_charts.php?type=quotes_by_month&year=${year}`)
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('quotesByMonthChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        datasets: [{
                            label: 'Cotizaciones',
                            data: data.counts,
                            backgroundColor: '#007bff',
                            borderColor: '#0056b3',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Número de Cotizaciones' }
                            },
                            x: {
                                title: { display: true, text: 'Mes' }
                            }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            });
    }

    // Gráfico de top 5 menús
    function loadTopMenus() {
        fetch('../php/adm_dashboard_charts.php?type=top_menus')
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('topMenusChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: data.names,
                        datasets: [{
                            data: data.counts,
                            backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'],
                            borderColor: ['#0056b3', '#218838', '#c82333', '#e0a800', '#138496'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            legend: { position: 'right' }
                        }
                    }
                });
            });
    }

    // Métricas
    function loadMetrics() {
        fetch('../php/adm_dashboard_charts.php?type=metrics')
            .then(response => response.json())
            .then(data => {
                document.getElementById('totalIncome').textContent = `$${data.total_income.toFixed(2)}`;
                document.getElementById('eventCount').textContent = data.event_count;
                document.getElementById('newClients').textContent = data.new_clients;
            });
    }

    // Top 5 clientes
    function loadTopClients() {
        fetch('../php/adm_dashboard_charts.php?type=top_clients')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('topClientsList');
                list.innerHTML = '';
                data.forEach(client => {
                    const item = document.createElement('li');
                    item.className = 'list-group-item d-flex justify-content-between align-items-center';
                    item.innerHTML = `
                        ${client.client_name}
                        <span class="badge badge-primary">${client.quote_count} cotizaciones</span>
                    `;
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', () => loadClientQuotes(client.id));
                    list.appendChild(item);
                });
            });
    }

    // Búsqueda de clientes
    const clientSearch = document.getElementById('clientSearch');
    clientSearch.addEventListener('input', debounce(function() {
        const query = clientSearch.value.trim();
        if (query.length < 2) {
            document.getElementById('clientSearchResults').innerHTML = '';
            return;
        }
        fetch(`../php/adm_dashboard_search.php?name=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const results = document.getElementById('clientSearchResults');
                results.innerHTML = '';
                data.forEach(client => {
                    const item = document.createElement('li');
                    item.className = 'list-group-item';
                    item.style.cursor = 'pointer';
                    item.textContent = client.name;
                    item.addEventListener('click', () => {
                        clientSearch.value = client.name;
                        results.innerHTML = '';
                        loadClientQuotes(client.id);
                    });
                    results.appendChild(item);
                });
            });
    }, 300));

    // Cargar cotizaciones de un cliente
    function loadClientQuotes(clientId) {
        fetch(`../php/adm_dashboard_search.php?client_id=${clientId}`)
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById('clientQuotesTable');
                tbody.innerHTML = '';
                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay cotizaciones para este cliente.</td></tr>';
                    return;
                }
                data.forEach(quote => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${quote.id}</td>
                        <td>${new Date(quote.quote_date).toLocaleDateString('es-ES')}</td>
                        <td>$${parseFloat(quote.total).toFixed(2)}</td>
                        <td>${quote.status}</td>
                    `;
                    tbody.appendChild(row);
                });
            });
    }

    // Inicializar
    loadYears();
    loadTopMenus();
    loadMetrics();
    loadTopClients();
});