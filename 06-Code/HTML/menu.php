<?php
session_start();

// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['current_event_id'])) {
    require_once '../php/Connection.php';
    $pdo = (new Connection())->connect();
    $stmt = $pdo->prepare("INSERT INTO events (client_id, event_type) VALUES (?, 'Evento Rápido')");
    $stmt->execute([$_SESSION['user_id']]);
    $_SESSION['current_event_id'] = $pdo->lastInsertId();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style_dashboard.css">
    <title>QuickQuote Catering</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- Font Awesome (para íconos) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>
<body>
    <div class="wrapper">
        <div class="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">Bienvenido Administrador</a>
                    <hr class="hr">
                </li>
                <br />
                <li><a href="dashboard.php"><i class="fa fa-th sidebar-icon"></i> Aplicación</a></li>
                <li><a href="quote-form.php"><i class="fa fa-calendar-check-o sidebar-icon"></i> Cotizacion</a></li>
                <li><a href="clients.php"><i class="fa fa-users sidebar-icon"></i> Clientes</a></li>
                <li><a href="menu.php"><i class="fa fa-file sidebar-icon"></i> Menu</a></li>
                <li><a href="menu_items.php"><i class="fa fa-file sidebar-icon"></i>Items del Menu</a></li>
                <li><a href="#"><i class="fa fa-bell sidebar-icon"></i> Notificaciones</a></li>
                <li><a href="#"><i class="fa fa-user sidebar-icon"></i> Empleados</a></li>
                <li><a href="../PHP/log_out.php"><i class="fa fa-sign-out-alt sidebar-icon"></i> Cerrar sesión</a></li>
            </ul>
        </div>

        <div>
            <header class="header navbar-light bg-faded">
                <div class="container-fluid">
                    <div class="row text-center">
                        <button type="button" class="btn hamburger-btn" id="menu-toggle">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <span class="page-title"><i class="fa fa-file sidebar-icon"></i> Menu</span>
                        <div class="profile-pic"></div>
                    </div>
                </div>
            </header>
            
            <div class="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <!-- Botón Nuevo -->
                            <button class="btn btn-success" data-toggle="modal" data-target="#nuevoModal" style="float:right;">+ Nuevo</button>                          
                        </div>
                    </div>

                    <!-- Start of filter block -->
                    <div class="row filter-block">
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="name_filter">Nombre</label>
                                <input type="text" class="form-control" name="name_filter" id="name_filter" placeholder="Buscar por nombre">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="type_filter">Tipo</label>
                                <select class="form-control" name="type_filter" id="type_filter">
                                    <option value="">Todos</option>
                                    <option value="predetermined">Predeterminado</option>
                                    <option value="customizable">Personalizable</option>
                                    <option value="hybrid">Híbrido</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="price_filter">Precio por persona (máximo)</label>
                                <input type="number" step="0.01" class="form-control" name="price_filter" id="price_filter" placeholder="Máximo precio">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="status_filter">Estado</label>
                                <select class="form-control" name="status_filter" id="status_filter">
                                    <option value="">Todos</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- End of filter block -->

                    <button class="btn btn-secondary tab-nav-btn disabled-btn" type="button" disabled><i class="fa fa-chevron-left"></i></button>
                    <button class="btn btn-secondary tab-nav-btn" type="button"><i class="fa fa-chevron-right"></i></button>
                    <br /><br />
                    
                    <!-- Listing table -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="cust-table-cont">
                                <div class="table-responsive">
                                    <table border="0" class="table cust-table"> 
                                        <thead>
                                            <tr style="width:80px;">
                                                <th style="width:75px;">Id</th> 
                                                <th style="width:250px;">Nombre del menu</th>  
                                                <th style="width:300px;">Descripcion</th> 
                                                <th style="width:200px;">Precio por persona</th> 
                                                <th class="text-center" style="width:200px;">Tipo</th> 
                                                <th class="text-center" style="width:200px;">Estado</th> 
                                                <th style="width:200px;" class="text-center"><i class="fa fa-gear"></i></th>  
                                            </tr>
                                        </thead>
                                        <!--Aqui tenemos que poner a la nueva tabla  -->
                                        <tbody id="tabla_menu">
                                            <!-- Las filas se cargaran aquí dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Nuevo -->
        <div class="modal fade" id="nuevoModal" tabindex="-1" aria-labelledby="nuevoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="nuevoModalLabel">Nuevo Menu</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="nuevoForm" method="post" action="../php/adm_menu_p_create.php">
                            
                            <input type="text" name="name_menu" class="form-control mb-2" placeholder="Nombre del menu" id="name_new" required>                            
                            <textarea  name="description" class="form-control mb-2" placeholder="Descripcion" id="description_new" required></textarea>
                            <input type="text" name="price_per_person" class="form-control mb-2" placeholder="Precio por persona" id="price_per_person_new" required>
                            
                            <!-- selector-->
                            <label for="type_edit">Tipo:</label>
                            <select name="type" class="form-control mb-2" id="type_edit" required>
                                <option value="predetermined">Predefinido</option>
                                <option value="customizable">Personalizable</option>
                            </select>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <input type="submit" class="btn btn-primary" value="Guardar">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Editar -->
        <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarModalLabel">Editar Menu</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm" method="post" action="../php/adm_menu_p_update.php">
                            <input type="hidden" name="id_menu" id="id_menu_edit">
                            <input type="text" name="name_menu" class="form-control mb-2" placeholder="Nombre del menu" id="name_edit" required>                             
                            <textarea name="description" class="form-control mb-2" placeholder="Descripcion" id="description_edit" required></textarea>
                            <input type="text" name="price_per_person" class="form-control mb-2" placeholder="Precio por persona" id="price_per_person_edit" required>                             
                            <!-- selector xd-->
                            <label for="type_edit">Tipo:</label>
                            <select name="type" class="form-control mb-2" id="type_edit" required>
                                <option value="predetermined">Predefinido</option>
                                <option value="customizable">Personalizable</option>
                            </select>
                           
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <input type="submit" class="btn btn-primary" value="Actualizar">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Eliminar -->
        <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="eliminarModalLabel">Eliminar Menu</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de desactivar el menú con el nombre <span id="nombre_eliminar"></span>?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
    <script src="../JavaScript/menu_p_crud.js"></script>
    <script src="../JavaScript/validationMenu.js"></script>  
</body>
</html>
