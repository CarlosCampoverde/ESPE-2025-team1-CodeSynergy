$(document).ready(function () {
    let currentSelection = {
        type: 'predetermined',
        menuId: null,
        customItems: [],
        peopleCount: 1,
        currentCategory: null
    };

    loadPredeterminedMenus();
    loadMenuCategories();

    $('#btn-predetermined').click(function () {
        currentSelection.type = 'predetermined';
        $(this).addClass('active');
        $('#btn-custom').removeClass('active');
        $('#predetermined-section').show();
        $('#custom-section').hide();
        $('#custom-items-section').hide();
    });

    $('#btn-custom').click(function () {
        currentSelection.type = 'custom';
        $(this).addClass('active');
        $('#btn-predetermined').removeClass('active');
        $('#predetermined-section').hide();
        $('#custom-section').show();
        $('#custom-items-section').hide();
    });

    $('#people-count').change(function () {
        currentSelection.peopleCount = parseInt($(this).val()) || 1;
    });

    $('#btn-continue').click(saveSelection);
    $('#btn-back-to-categories').click(function () {
        $('#custom-categories').show();
        $('#custom-items-section').hide();
        currentSelection.currentCategory = null;
    });

    function loadPredeterminedMenus() {
        $('#predetermined-options').html('<div class="loading">Cargando menús...</div>');

        $.ajax({
            url: '../php/get-menus.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.success && response.data) {
                    renderPredeterminedMenus(response.data);
                } else {
                    showError('Formato de respuesta inesperado');
                }
            },
            error: function (xhr, status, error) {
                showError('Error al cargar menús: ' + error);
            }
        });
    }

    function loadMenuCategories() {
        $('#custom-categories').html('<div class="loading">Cargando categorías...</div>');

        $.ajax({
            url: '../php/get-menu-categories.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.success && response.data) {
                    renderMenuCategories(response.data);
                } else {
                    showError('Formato de respuesta inesperado');
                }
            },
            error: function (xhr, status, error) {
                showError('Error al cargar categorías: ' + error);
            }
        });
    }

    function loadMenuItems(categoryId) {
        $('#custom-items-container').html('<div class="loading">Cargando opciones...</div>');

        $.ajax({
            url: '../php/get-menu-items.php?category_id=' + categoryId,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.success && response.data) {
                    renderMenuItems(response.data);
                } else {
                    showError('Formato de respuesta inesperado');
                }
            },
            error: function (xhr, status, error) {
                showError('Error al cargar opciones: ' + error);
            }
        });
    }

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

            menuCard.click(function () {
                $('.menu-card').removeClass('selected');
                $(this).addClass('selected');
                currentSelection.menuId = menu.id;
            });

            container.append(menuCard);
        });
    }

    function renderMenuCategories(categories) {
        const container = $('#custom-categories');
        container.empty();

        if (categories.length === 0) {
            container.html('<p>No hay categorías disponibles</p>');
            return;
        }

        categories.forEach(category => {
            const categoryCard = $(`
                <div class="category-card" data-id="${category.id}">
                    <h3>${category.name}</h3>
                    <p>Selecciona ${category.min_selections} a ${category.max_selections || 'ilimitadas'} opciones</p>
                </div>
            `);

            categoryCard.click(function () {
                currentSelection.currentCategory = category.id;
                loadMenuItems(category.id);
                $('#custom-categories').hide();
                $('#custom-items-section').show();
            });

            container.append(categoryCard);
        });
    }

    function renderMenuItems(items) {
        const container = $('#custom-items-container');
        container.empty();

        if (items.length === 0) {
            container.html('<p>No hay opciones disponibles en esta categoría</p>');
            return;
        }

        items.forEach(item => {
            const itemElement = $(`
                <div class="custom-item" data-item-id="${item.id}">
                    <div>
                        <input type="checkbox" id="item-${item.id}">
                        <label for="item-${item.id}">${item.name} - $${item.price}</label>
                        ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                    </div>
                    <input type="number" min="1" max="10" value="1" class="item-quantity">
                </div>
            `);

            itemElement.find('input[type="checkbox"]').change(function () {
                const isSelected = $(this).is(':checked');
                const quantity = parseInt(itemElement.find('.item-quantity').val()) || 1;
                const existingIndex = currentSelection.customItems.findIndex(i => i.id === item.id);

                if (isSelected) {
                    if (existingIndex === -1) {
                        currentSelection.customItems.push({
                            id: item.id,
                            quantity,
                            price: item.price,
                            category: currentSelection.currentCategory
                        });
                    } else {
                        currentSelection.customItems[existingIndex].quantity = quantity;
                    }
                } else if (existingIndex !== -1) {
                    currentSelection.customItems.splice(existingIndex, 1);
                }
            });

            container.append(itemElement);
        });
    }

    function saveSelection() {
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
            url: '../php/save-selection.php',
            type: 'POST',
            dataType: 'json',
            data: {
                selection: JSON.stringify(currentSelection)
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = 'servicios.html?selection=' + response.selectionId;
                } else {
                    showError(response.message || 'Error al guardar');
                }
            },
            error: function (xhr, status, error) {
                showError('Error en la solicitud: ' + error);
            },
            complete: function () {
                $('#btn-continue').prop('disabled', false).text('Continuar');
            }
        });
    }

    function showError(message) {
        alert('Error: ' + message);
        console.error(message);
    }
});
