<?php
session_start();


// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['username'])) {
    header('Location: ../index.php');
    
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style_dashboard.css">
    <link rel="stylesheet" href="../css/styles.css">

    <title>QuickQuote Catering</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js" integrity="sha512-ykZ1QQr0Jy/4ZkvKuqWn4iF3lqPZyij9iRv6sGqLRdTPkY69YX6+7wvVGmsdBbiIfN/8OdsI7HABjvEok6ZopQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>

<body>
    <div class="wrapper">
        <?php include 'sidebar.php'; ?>
    <div>
       
        <header class="header navbar-light bg-faded">
           <div class="container-fluid">
               <div class="row text-center">
                     <button type="button" class="btn hamburger-btn" id="menu-toggle">
                       <span class="navbar-toggler-icon"></span>
                     </button>
                     <span class="page-title">Sistema de Cotización</span>
                     <div class="profile-pic">
                      
                     </div>
               </div> <!-- ENd of row -->
           </div> <!-- End of container fluid -->
       </header>

    <div class="container" >        
        <form id="quoteForm" action="../PHP/process_quote.php" method="post">
            <!-- Paso 1: Información del Cliente -->
            <div class="form-step active" id="step1">
                <h4>Información del Cliente</h4>
                <div class="form-group">
                    <label for="first_name">Nombres:</label>
                    <input type="text" id="first_name" name="first_name" required>
                </div>
                <div class="form-group">
                    <label for="last_name">Apellidos:</label>
                    <input type="text" id="last_name" name="last_name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="address">Dirección:</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <button type="button" class="next-btn" data-current="1" data-next="2">Siguiente</button>
            </div>
            
            <!-- Paso 2: Información del Evento -->
            <div class="form-step" id="step2">
                <h2>Información del Evento</h2>
                <div class="form-group">
                    <label for="event_type">Tipo de Evento:</label>
                    <input type="text" id="event_type" name="event_type" required>
                </div>
                <div class="form-group">
                    <label for="event_date">Fecha del Evento:</label>
                    <input type="date" id="event_date" name="event_date" required>
                </div>
                <div class="form-group">
                    <label for="location">Ubicación:</label>
                    <input type="text" id="location" name="location" required>
                </div>
                <div class="form-group">
                    <label for="guests">Número de Invitados:</label>
                    <input type="number" id="guests" name="guests" min="1" required>
                </div>
                <button type="button" class="prev-btn" data-current="2" data-prev="1">Anterior</button>
                <button type="button" class="next-btn" data-current="2" data-next="3">Siguiente</button>
            </div>
            
            <!-- Paso 3: Selección de Menú -->
            <div class="form-step" id="step3">
                <h2>Selección de Menú</h2>
                <div class="form-group">
                    <label for="menu_type">Tipo de Menú:</label>
                    <select id="menu_type" name="menu_type" required>
                        <option value="">Seleccione un tipo</option>
                        <option value="predetermined">Menú Predeterminado</option>
                        <option value="customizable">Menú Personalizado</option>
                    </select>
                </div>
                
                <div id="predetermined_menus" class="menu-section">
                    <h3>Menús Disponibles</h3>
                    <div id="menu_list"></div>
                </div>
                
                <div id="custom_menu" class="menu-section" style="display:none;">
                    <h3>Personaliza tu Menú</h3>
                    <div id="custom_menu_categories"></div>
                </div>
                
                <button type="button" class="prev-btn" data-current="3" data-prev="2">Anterior</button>
                <button type="button" class="next-btn" data-current="3" data-next="4">Siguiente</button>
            </div>
            
            <!-- Paso 4: Servicios Adicionales -->
            <div class="form-step" id="step4">
                <h2>Servicios Adicionales</h2>
                <div id="services_list"></div>
                
                <div class="form-group">
                    <label for="comments">Comentarios o Requerimientos Especiales:</label>
                    <textarea id="comments" name="comments" rows="4"></textarea>
                </div>
                
                <button type="button" class="prev-btn" data-current="4" data-prev="3">Anterior</button>
                <button type="submit" class="submit-btn">Generar Cotización</button>
            </div>
        </form>
    </div>
    
    <script src="../javascript/quote_form.js"></script>
    <script src="../javascript/common.js"></script>
    <script src="../javascript/validation_quote_form.js"></script>
</body>
</html>