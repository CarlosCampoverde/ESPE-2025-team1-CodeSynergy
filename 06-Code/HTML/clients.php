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
    <title>QuickQuote Catering - Clientes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
                        <span class="page-title"><i class="fa fa-users sidebar-icon"></i> Clientes</span>
                        <div class="profile-pic"></div>
                    </div>
                </div>
            </header>
            
            <div class="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <button class="btn btn-success" data-toggle="modal" data-target="#nuevoModal" style="float:right;">+ Nuevo</button>                          
                        </div>
                    </div>

                    <!-- Start of filter block -->
                    <div class="row filter-block">
                        <div class="col-6 col-md-4">
                            <div class="form-group">
                                <label for="name_filter">Nombre</label>
                                <input type="text" class="form-control" name="name_filter" id="name_filter" placeholder="Buscar por nombre o apellido">
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                            <div class="form-group">
                                <label for="email_filter">Email</label>
                                <input type="text" class="form-control" name="email_filter" id="email_filter" placeholder="Buscar por email">
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                            <div class="form-group">
                                <label for="phone_filter">Teléfono</label>
                                <input type="text" class="form-control" name="phone_filter" id="phone_filter" placeholder="Buscar por teléfono">
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
                                            <tr>
                                                <th style="width:75px;">Id</th> 
                                                <th style="width:200px;">Nombre</th>  
                                                <th style="width:200px;">Apellido</th> 
                                                <th style="width:250px;">Email</th> 
                                                <th style="width:150px;">Teléfono</th>
                                                <th style="width:250px;">Dirección</th>
                                                <th style="width:200px;" class="text-center"><i class="fa fa-gear"></i></th>  
                                            </tr>
                                        </thead>
                                        <tbody id="tabla_clientes">
                                            <!-- Las filas se cargarán aquí dinámicamente -->
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
                        <h5 class="modal-title" id="nuevoModalLabel">Nuevo Cliente</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="nuevoForm" method="post" action="../php/adm_clients_create.php">
                            <input type="text" name="first_name" class="form-control mb-2" placeholder="Nombre" id="first_name_new" required>
                            <input type="text" name="last_name" class="form-control mb-2" placeholder="Apellido" id="last_name_new" required>
                            <input type="email" name="email" class="form-control mb-2" placeholder="Email" id="email_new">
                            <input type="text" name="phone" class="form-control mb-2" placeholder="Teléfono" id="phone_new">
                            <input type="text" name="address" class="form-control mb-2" placeholder="Dirección" id="address_new">
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
                        <h5 class="modal-title" id="editarModalLabel">Editar Cliente</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm" method="post" action="../php/adm_clients_update.php">
                            <input type="hidden" name="id_client" id="id_client_edit">
                            <input type="text" name="first_name" class="form-control mb-2" placeholder="Nombre" id="first_name_edit" required>
                            <input type="text" name="last_name" class="form-control mb-2" placeholder="Apellido" id="last_name_edit" required>
                            <input type="email" name="email" class="form-control mb-2" placeholder="Email" id="email_edit">
                            <input type="text" name="phone" class="form-control mb-2" placeholder="Teléfono" id="phone_edit">
                            <input type="text" name="address" class="form-control mb-2" placeholder="Dirección" id="address_edit">
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
                        <h5 class="modal-title" id="eliminarModalLabel">Eliminar Cliente</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de eliminar al cliente <span id="nombre_eliminar"></span>? Esta acción no se puede deshacer.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../JavaScript/clients_CRUD.js"></script>        
    <script src="../JavaScript/validationClients.js"></script>
    <script src="../JavaScript/common.js"></script> 

</body>
</html>