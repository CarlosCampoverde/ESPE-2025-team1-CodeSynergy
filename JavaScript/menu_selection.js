document.addEventListener('DOMContentLoaded', function() {
    const menuTypeTabs = document.querySelectorAll('.menu_type_tab');
    const menuSections = document.querySelectorAll('.menu_section');
    const menuForm = document.getElementById('menu_selection_form');
    const peopleCountInput = document.getElementById('people_count');
    let menuData = null;

    // Cargar datos del menú
    async function loadMenuData() {
        try {
            const response = await fetch('PHP/menu_handler.php?action=get_menu_items');
            const data = await response.json();
            
            if (data.success) {
                menuData = data.categories;
                renderCustomMenuOptions();
            } else {
                throw new Error(data.message || 'Error al cargar el menú');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo cargar el menú. Por favor recarga la página.');
        }
    }

    // Renderizar opciones personalizadas
    function renderCustomMenuOptions() {
        const container = document.getElementById('custom_menu_items');
        container.innerHTML = '';
        
        menuData.forEach(category => {
            const categoryHtml = `
                <div class="category_section" data-category-id="${category.id}" 
                     data-min="${category.min_selections}" data-max="${category.max_selections || ''}">
                    <h4>${category.name}</h4>
                    <div class="category_items">
                        ${category.items.map(item => `
                            <div class="menu_item">
                                <input type="checkbox" id="item_${item.id}" name="items[]" value="${item.id}" 
                                       data-price="${item.price}" class="item_checkbox">
                                <label for="item_${item.id}">
                                    <span class="item_name">${item.name}</span>
                                    <span class="item_price">$${item.price.toFixed(2)}</span>
                                    ${item.description ? `<p class="item_desc">${item.description}</p>` : ''}
                                </label>
                                <input type="number" name="item_${item.id}_qty" min="1" value="1" class="item_qty">
                            </div>
                        `).join('')}
                    </div>
                    <div class="selection_feedback" id="feedback_${category.id}"></div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', categoryHtml);
        });
        
        // Event listeners para validación
        document.querySelectorAll('.item_checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', validateCategorySelections);
        });
    }

    // Validar selecciones por categoría
    function validateCategorySelections() {
        menuData.forEach(category => {
            const categoryEl = document.querySelector(`.category_section[data-category-id="${category.id}"]`);
            const checkboxes = categoryEl.querySelectorAll('.item_checkbox:checked');
            const feedbackEl = categoryEl.querySelector('.selection_feedback');
            
            const min = parseInt(categoryEl.dataset.min);
            const max = categoryEl.dataset.max ? parseInt(categoryEl.dataset.max) : null;
            
            if (checkboxes.length < min) {
                feedbackEl.textContent = `Seleccione al menos ${min} ${min === 1 ? 'opción' : 'opciones'}`;
                feedbackEl.className = 'selection_feedback error';
            } else if (max && checkboxes.length > max) {
                feedbackEl.textContent = `Máximo ${max} ${max === 1 ? 'opción' : 'opciones'} permitidas`;
                feedbackEl.className = 'selection_feedback error';
                this.checked = false;
            } else {
                feedbackEl.textContent = '';
                feedbackEl.className = 'selection_feedback';
            }
        });
    }

    // Cambiar entre pestañas de menú
    menuTypeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            menuTypeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.dataset.target;
            menuSections.forEach(section => {
                section.style.display = section.id === target ? 'block' : 'none';
            });
            
            document.getElementById('menu_type').value = target === 'predefined_menu' ? 'predefined' : 'custom';
        });
    });

    // Enviar formulario
    menuForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const isCustomMenu = document.getElementById('custom_menu').style.display === 'block';
        const peopleCount = parseInt(peopleCountInput.value);
        
        if (peopleCount < 1) {
            alert('Ingrese un número válido de personas');
            return;
        }
        
        if (isCustomMenu) {
            let isValid = true;
            document.querySelectorAll('.category_section').forEach(section => {
                const min = parseInt(section.dataset.min);
                const checked = section.querySelectorAll('.item_checkbox:checked').length;
                
                if (checked < min) {
                    isValid = false;
                    const feedback = section.querySelector('.selection_feedback');
                    feedback.textContent = `Seleccione al menos ${min} ${min === 1 ? 'opción' : 'opciones'}`;
                    feedback.className = 'selection_feedback error';
                }
            });
            
            if (!isValid) return;
            
            const selectedItems = [];
            document.querySelectorAll('.item_checkbox:checked').forEach(checkbox => {
                const itemId = checkbox.value;
                const quantity = parseInt(checkbox.closest('.menu_item').querySelector('.item_qty').value);
                const price = parseFloat(checkbox.dataset.price);
                
                selectedItems.push({
                    id: itemId,
                    quantity: quantity,
                    price: price
                });
            });
            
            try {
                const response = await fetch('../PHP/menu_handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'save_custom_menu',
                        quote_id: 123, // Reemplazar con ID real
                        people_count: peopleCount,
                        items: JSON.stringify(selectedItems)
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Menú guardado correctamente');
                    // Redirigir o continuar con el siguiente paso
                    window.location.href = '../index.php?step=services';
                } else {
                    throw new Error(data.message || 'Error al guardar el menú');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al guardar el menú: ' + error.message);
            }
        } else {
            // Procesar menú predeterminado
            menuForm.submit();
        }
    });

    // Cargar datos al iniciar
    loadMenuData();
});