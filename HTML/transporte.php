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
                <li><a href="#"><i class="fa fa-calendar-check-o sidebar-icon"></i> Reservas</a></li>
                <li><a href="transporte.php"><i class="fa fa-truck sidebar-icon"></i> Transporte</a></li>
                <li><a href="#"><i class="fa fa-users sidebar-icon"></i> Clientes</a></li>
                <li><a href="#"><i class="fa fa-file sidebar-icon"></i> Precios</a></li>
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
                        <span class="page-title"><i class="fa fa-truck sidebar-icon"></i> Transporte</span>
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
                                <label for="priority">Prioridad</label>
                                <input type="text" class="form-control" name="priority" id="priority" placeholder="">
                            </div> 
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="type">Tipo</label>
                                <input type="text" class="form-control" name="type" id="type" placeholder="">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="assigned">Asignado para</label>
                                <input type="text" class="form-control" name="assigned" id="assigned" placeholder="">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="status">Estado</label>
                                <input type="text" class="form-control" name="status" id="status" placeholder="">
                            </div>
                        </div>
                    </div>
                    <!-- End of filter block -->

                    <button class="btn btn-secondary tab-nav-btn disabled-btn" type="button" disabled><i class="fa fa-chevron-left"></i></button>
                    <button class="btn btn-secondary tab-nav-btn" type="button"><i class="fa fa-chevron-right"></i></button>
                    <br /><br />
                    
                    <!-- Listing table -->
                    <!-- Listing table -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="cust-table-cont">
                                <div class="table-responsive">
                                    <table border="0" class="table cust-table"> 
                                        <thead>
                                            <tr style="width:80px;">
                                                <th style="width:20px;">#</th> 
                                                <th style="width:100px;">Tipo de vehículo</th>  
                                                <th style="width:100px;">Placa</th> 
                                                <th style="width:100px;">Estado</th> 
                                                <th style="width:120px;">Capacidad</th>     
                                                <th style="width:180px;">Asignado para</th> 
                                                <th style="width:100px;">Color</th> 
                                                <th style="width:80px;" class="text-center"><i class="fa fa-gear"></i></th>  
                                            </tr>
                                        </thead>
                                        <tbody id="tablaVehiculosBody">
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
                        <h5 class="modal-title" id="nuevoModalLabel">Nuevo Vehículo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="nuevoForm" method="post" action="../php/create_vehicle.php">
                            <input type="text" name="tipo_vehiculo" class="form-control mb-2" placeholder="Tipo de vehiculo" id="tipoNuevo" required>                            
                            <input type="text" name="placa" class="form-control mb-2" placeholder="Placa" id="placaNuevo" required>
                            <input type="text" name="estado" class="form-control mb-2" placeholder="Estado" id="estadoNuevo" required>
                            <input type="text" name="capacidad" class="form-control mb-2" placeholder="Capacidad" id="capacidadNuevo" required>
                            <input type="text" name="asignado" class="form-control mb-2" placeholder="Asignado para" id="asignadoNuevo" required>
                            <input type="text" name="color" class="form-control mb-2" placeholder="Color" id="colorNuevo" required>
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
                        <h5 class="modal-title" id="editarModalLabel">Editar Vehículo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm" method="post" action="../php/update_vehicle.php">
                            <input type="text" name="tipo_vehiculo" class="form-control mb-2" placeholder="Tipo de vehiculo" id="tipoEditar" required>
                            <input type="text" name="placa" class="form-control mb-2" placeholder="Placa" id="placaEditar" required>
                            <input type="text" name="estado" class="form-control mb-2" placeholder="Estado" id="estadoEditar" required>
                            <input type="text" name="capacidad" class="form-control mb-2" placeholder="Capacidad" id="capacidadEditar" required>
                            <input type="text" name="asignado" class="form-control mb-2" placeholder="Asignado para" id="asignadoEditar" required>
                            <input type="text" name="color" class="form-control mb-2" placeholder="Color" id="colorEditar" required>
                            
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
                        <h5 class="modal-title" id="eliminarModalLabel">Eliminar Vehículo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de eliminar el vehículo con placa <span id="placaEliminar"></span>?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <script src="../JavaScript/buttons-CRUD.js"></script> 
</body>
</html>
