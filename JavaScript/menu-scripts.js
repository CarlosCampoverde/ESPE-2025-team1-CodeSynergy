$(document).ready(function() {
    // Variables de estado
    let currentSelection = {
        type: 'predetermined',
        menuId: null,
        customItems: [],
        peopleCount: 1
    };

    // Cargar datos iniciales
    loadPredeterminedMenus();
    loadCustomOptions();

    // Manejadores de eventos
    $('#btn-predetermined').click(function() {
        currentSelection.type = 'predetermined';
        $(this).addClass('active');
        $('#btn-custom').removeClass('active');
        $('#predetermined-section').show();
        $('#custom-section').hide();
    });

    $('#btn-custom').click(function() {
        currentSelection.type = 'custom';
        $(this).addClass('active');
        $('#btn-predetermined').removeClass('active');
        $('#custom-section').show();
        $('#predetermined-section').hide();
    });

    $('#people-count').change(function() {
        currentSelection.peopleCount = parseInt($(this).val()) || 1;
    });

    $('#btn-continue').click(saveSelection);

    // Funciones de carga
    function loadPredeterminedMenus() {
        $('#predetermined-options').html('<div class="loading">Cargando menús...</div>');

        $.ajax({
            url: '../PHP/get-menus.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.data) {
                    renderPredeterminedMenus(response.data);
                } else {
                    showError('Formato de respuesta inesperado');
                }
            },
            error: function(xhr, status, error) {
                showError('Error al cargar menús: ' + error);
            }
        });
    }

    function loadCustomOptions() {
        $('#custom-options').html('<div class="loading">Cargando opciones...</div>');

        $.ajax({
            url: '../PHP/get-menu-items.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.data) {
                    renderCustomOptions(response.data);
                } else {
                    showError('Formato de respuesta inesperado');
                }
            },
            error: function(xhr, status, error) {
                showError('Error al cargar opciones: ' + error);
            }
        });
    }

    // Funciones de renderizado
    function renderPredeterminedMenus(menus) {
        const container = $('#predetermined-options');
        container.empty();

        if (menus.length === 0) {
            container.html('<p>No hay menús disponibles</p>');
            return;
        }

        menus.forEach(menu => {
            const menuCard = $(`
                <div class="menu-card" data-id="${menu.id}">
                    <h3>${menu.name}</h3>
                    <p>${menu.description || ''}</p>
                    <p class="price">$${menu.price_per_person} por persona</p>
                </div>
            `);

            menuCard.click(function() {
                $('.menu-card').removeClass('selected');
                $(this).addClass('selected');
                currentSelection.menuId = menu.id;
            });

            container.append(menuCard);
        });
    }

    function renderCustomOptions(items) {
        const container = $('#custom-options');
        container.empty();

        // Agrupar items por categoría
        const categories = {};
        items.forEach(item => {
            if (!categories[item.category_id]) {
                categories[item.category_id] = {
                    name: item.category_name,
                    items: []
                };
            }
            categories[item.category_id].items.push(item);
        });

        // Crear interfaz por categoría
        for (const [categoryId, category] of Object.entries(categories)) {
            const categorySection = $(`
                <div class="custom-category">
                    <h3>${category.name}</h3>
                    <div class="category-items" data-category-id="${categoryId}"></div>
                </div>
            `);

            const itemsContainer = categorySection.find('.category-items');
            
            category.items.forEach(item => {
                const itemElement = $(`
                    <div class="custom-item" data-item-id="${item.id}">
                        <div>
                            <input type="checkbox" id="item-${item.id}">
                            <label for="item-${item.id}">${item.name} - $${item.price}</label>
                        </div>
                        <input type="number" min="1" max="10" value="1" class="item-quantity">
                    </div>
                `);

                // Manejar selección de items
                itemElement.find('input[type="checkbox"]').change(function() {
                    const itemId = item.id;
                    const isSelected = $(this).is(':checked');
                    const quantity = parseInt(itemElement.find('.item-quantity').val()) || 1;

                    if (isSelected) {
                        currentSelection.customItems.push({
                            id: itemId,
                            quantity: quantity
                        });
                    } else {
                        currentSelection.customItems = currentSelection.customItems.filter(i => i.id !== itemId);
                    }
                });

                itemsContainer.append(itemElement);
            });

            container.append(categorySection);
        }
    }

    // Función para guardar selección
    function saveSelection() {
        // Validación básica
        if (currentSelection.type === 'predetermined' && !currentSelection.menuId) {
            showError('Por favor selecciona un menú');
            return;
        }

        if (currentSelection.type === 'custom' && currentSelection.customItems.length === 0) {
            showError('Por favor selecciona al menos un ítem');
            return;
        }

        $('#btn-continue').prop('disabled', true).text('Procesando...');

        $.ajax({
            url: '../PHP/save-selection.php',
            type: 'POST',
            dataType: 'json',
            data: {
                selection: JSON.stringify(currentSelection)
            },
            success: function(response) {
                if (response.success) {
                    window.location.href = 'servicios.html?selection=' + response.selectionId;
                } else {
                    showError(response.message || 'Error al guardar');
                }
            },
            error: function(xhr, status, error) {
                showError('Error en la solicitud: ' + error);
            },
            complete: function() {
                $('#btn-continue').prop('disabled', false).text('Continuar');
            }
        });
    }

    // Función auxiliar para mostrar errores
    function showError(message) {
        alert('Error: ' + message);
        console.error(message);
    }
});