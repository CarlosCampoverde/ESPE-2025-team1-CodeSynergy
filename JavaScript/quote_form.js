document.addEventListener('DOMContentLoaded', function() {
    // Manejo de pasos del formulario
    function setupFormSteps() {
        // Botones Siguiente
        document.querySelectorAll('.next-btn').forEach(button => {
            button.addEventListener('click', function() {
                const current = this.getAttribute('data-current');
                const next = this.getAttribute('data-next');
                changeStep(current, next);
                
                // Cargar datos dinámicos cuando sea necesario
                if (next === '3') loadMenuOptions();
                if (next === '4') loadServices();
            });
        });

        // Botones Anterior
        document.querySelectorAll('.prev-btn').forEach(button => {
            button.addEventListener('click', function() {
                const current = this.getAttribute('data-current');
                const prev = this.getAttribute('data-prev');
                changeStep(current, prev);
            });
        });
    }

    // Añadir al final del event listener del formulario
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    // [Validaciones anteriores...]
    
    // Mostrar loader mientras se procesa
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Generando PDF... <span class="loader"></span>';
});

    function changeStep(hide, show) {
        document.getElementById(`step${hide}`).classList.remove('active');
        document.getElementById(`step${show}`).classList.add('active');
    }

    // Carga dinámica de opciones de menú
    function loadMenuOptions() {
        const menuTypeSelect = document.getElementById('menu_type');
        menuTypeSelect.addEventListener('change', function() {
            const menuType = this.value;
            
            if (menuType === 'predetermined') {
                document.getElementById('predetermined_menus').style.display = 'block';
                document.getElementById('custom_menu').style.display = 'none';
                loadPredeterminedMenus();
            } else if (menuType === 'customizable') {
                document.getElementById('predetermined_menus').style.display = 'none';
                document.getElementById('custom_menu').style.display = 'block';
                loadCustomMenuCategories();
            } else {
                document.getElementById('predetermined_menus').style.display = 'none';
                document.getElementById('custom_menu').style.display = 'none';
            }
        });
    }

    // Cargar menús predeterminados desde la base de datos
    function loadPredeterminedMenus() {
        fetch('../php/get_data.php?type=menus')
            .then(response => response.json())
            .then(menus => {
                const menuList = document.getElementById('menu_list');
                menuList.innerHTML = '';
                
                if (menus.error) {
                    menuList.innerHTML = `<div class="error">${menus.error}</div>`;
                    return;
                }
                
                menus.forEach(menu => {
                    const menuDiv = document.createElement('div');
                    menuDiv.className = 'menu-option';
                    
                    menuDiv.innerHTML = `
                        <div>
                            <input type="radio" name="selected_menu" id="menu_${menu.id}" value="${menu.id}" required>
                            <label for="menu_${menu.id}">${menu.name} - $${menu.price_per_person} por persona</label>
                        </div>
                        <div>
                            <small>${menu.description}</small>
                        </div>
                    `;
                    
                    menuList.appendChild(menuDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('menu_list').innerHTML = 
                    `<div class="error">Error al cargar los menús</div>`;
            });
    }

    // Cargar categorías para menú personalizado
    function loadCustomMenuCategories() {
        fetch('../php/get_data.php?type=categories')
            .then(response => response.json())
            .then(categories => {
                const customMenuDiv = document.getElementById('custom_menu_categories');
                customMenuDiv.innerHTML = '';
                
                if (categories.error) {
                    customMenuDiv.innerHTML = `<div class="error">${categories.error}</div>`;
                    return;
                }
                
                categories.forEach(category => {
                    const categorySection = document.createElement('div');
                    categorySection.className = 'category-section';
                    
                    categorySection.innerHTML = `
                        <div class="category-title">
                            ${category.name} 
                            <small>(Seleccione ${category.min_selections} a ${category.max_selections || 'ilimitado'} opciones)</small>
                        </div>
                        <div id="category_${category.id}_items"></div>
                    `;
                    
                    customMenuDiv.appendChild(categorySection);
                    loadMenuItemsForCategory(category.id);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('custom_menu_categories').innerHTML = 
                    `<div class="error">Error al cargar las categorías</div>`;
            });
    }

    // Cargar items para cada categoría
    function loadMenuItemsForCategory(categoryId) {
        fetch(`../php/get_data.php?type=items&category_id=${categoryId}`)
            .then(response => response.json())
            .then(items => {
                const itemsContainer = document.getElementById(`category_${categoryId}_items`);
                itemsContainer.innerHTML = '';
                
                if (items.error) {
                    itemsContainer.innerHTML = `<div class="error">${items.error}</div>`;
                    return;
                }
                
                items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'item-option';
                    
                    itemDiv.innerHTML = `
                        <div>
                            <input type="checkbox" name="custom_items[]" id="item_${item.id}" value="${item.id}">
                            <label for="item_${item.id}">${item.name} - $${item.price}</label>
                            <small>${item.description}</small>
                        </div>
                        ${item.allow_quantity ? `
                        <div>
                            <label for="item_${item.id}_qty">Cantidad:</label>
                            <input type="number" name="item_${item.id}_qty" id="item_${item.id}_qty" 
                                   min="1" max="${item.max_quantity || ''}" value="1">
                        </div>
                        ` : ''}
                    `;
                    
                    itemsContainer.appendChild(itemDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById(`category_${categoryId}_items`).innerHTML = 
                    `<div class="error">Error al cargar los ítems</div>`;
            });
    }

    // Cargar servicios adicionales
    function loadServices() {
        fetch('../php/get_data.php?type=services')
            .then(response => response.json())
            .then(services => {
                const servicesList = document.getElementById('services_list');
                servicesList.innerHTML = '';
                
                if (services.error) {
                    servicesList.innerHTML = `<div class="error">${services.error}</div>`;
                    return;
                }
                
                services.forEach(service => {
                    const serviceDiv = document.createElement('div');
                    serviceDiv.className = 'service-item';
                    
                    serviceDiv.innerHTML = `
                        <div>
                            <input type="checkbox" name="services[]" id="service_${service.id}" value="${service.id}">
                            <label for="service_${service.id}">${service.name} - $${service.unit_price}</label>
                            <small>${service.description}</small>
                        </div>
                        <div>
                            <label for="service_${service.id}_qty">Cantidad:</label>
                            <input type="number" name="service_${service.id}_qty" id="service_${service.id}_qty" 
                                   min="1" value="1">
                        </div>
                    `;
                    
                    servicesList.appendChild(serviceDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('services_list').innerHTML = 
                    `<div class="error">Error al cargar los servicios</div>`;
            });
    }

    // Validación del formulario antes de enviar
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        // Validar que se haya seleccionado un menú
        const menuType = document.getElementById('menu_type').value;
        if (!menuType) {
            e.preventDefault();
            alert('Por favor seleccione un tipo de menú');
            document.getElementById('step3').scrollIntoView();
            return;
        }
        
        if (menuType === 'predetermined' && !document.querySelector('input[name="selected_menu"]:checked')) {
            e.preventDefault();
            alert('Por favor seleccione un menú');
            document.getElementById('step3').scrollIntoView();
            return;
        }
        
        if (menuType === 'customizable' && !document.querySelector('input[name="custom_items[]"]:checked')) {
            e.preventDefault();
            alert('Por favor seleccione al menos un ítem para su menú personalizado');
            document.getElementById('step3').scrollIntoView();
            return;
        }
        
        // Mostrar mensaje de confirmación
        if (!confirm('¿Está seguro que desea generar la cotización?')) {
            e.preventDefault();
        }
    });

    // Inicializar todo cuando el DOM esté listo
    setupFormSteps();
});