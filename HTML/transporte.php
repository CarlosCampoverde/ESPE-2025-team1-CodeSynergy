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
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="cust-table-cont">
                                <div class="table-responsive">
                                    <table border="0" class="table cust-table"> 
                                        <thead>
                                            <tr style="width:80px;">
                                                <th style="width:70px;">#</th> 
                                                <th style="width:120px;" class="text-center"><i class="fa fa-gear"></i></th>  
                                                <th style="width:200px;">Tipo de vehículo</th>  
                                                <th style="width:150px;">Placa</th> 
                                                <th style="width:100px;">Estado</th> 
                                                <th style="width:120px;">Capacidad</th>     
                                                <th style="width:150px;">Asignado para</th> 
                                                <th style="width:120px;">Color</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th style="width:70px;">1</th>
                                                <td style="width:120px;" class="text-center">
                                                    <button class="btn btn-outline-danger del-icon"><span class="fa fa-trash-o"></span></button> 
                                                    <button class="btn btn-outline-success"><span class="fa fa-pencil"></span></button>
                                                </td>
                                                <td style="width:200px;">Camioneta</td>
                                                <td style="width:150px;">PBQ-5420</td>
                                                <td style="width:100px;">ACTIVO</td>
                                                <td style="width:120px;">5 personas</td>
                                                <td style="width:150px;">Transporte de comida</td>
                                                <td style="width:120px;">Azul</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td class="text-center">
                                                    <button class="btn btn-outline-danger del-icon"><span class="fa fa-trash-o"></span></button> 
                                                    <button class="btn btn-outline-success"><span class="fa fa-pencil"></span></button>
                                                </td>
                                                <td>Camion</td>
                                                <td>ICD-2545</td>
                                                <td>INACTIVO</td>
                                                <td>3 personas</td>
                                                <td>Transporte de alimentos</td>
                                                <td>Blanco</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td class="text-center">
                                                    <button class="btn btn-outline-danger del-icon"><span class="fa fa-trash-o"></span></button> 
                                                    <button class="btn btn-outline-success"><span class="fa fa-pencil"></span></button>
                                                </td>
                                                <td>Furgoneta</td>
                                                <td>XDA-7154</td>
                                                <td>ACTIVO</td>
                                                <td>15 personas</td>
                                                <td>Transporte de personal</td>
                                                <td>Gris</td>
                                            </tr>
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
                        <form id="nuevoForm">
                            <!-- Formulario de Nuevo Vehículo -->
                            <label for="placaNuevo">Placa</label>
                            <input type="text" class="form-control mb-2" placeholder="Placa" id="placaNuevo">
                            <input type="text" class="form-control mb-2" placeholder="Estado" id="estadoNuevo">
                            <input type="text" class="form-control mb-2" placeholder="Capacidad" id="capacidadNuevo">
                            <input type="text" class="form-control mb-2" placeholder="Asignado para" id="asignadoNuevo">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" id="guardarNuevo">Guardar</button>
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
                        <form id="editarForm">
                            <!-- Formulario de Editar Vehículo -->
                            <input type="text" class="form-control mb-2" placeholder="Placa" id="placaEditar" readonly>
                            <input type="text" class="form-control mb-2" placeholder="Marca" id="estadoEditar">
                            <input type="text" class="form-control mb-2" placeholder="Modelo" id="capacidadEditar">
                            <input type="text" class="form-control mb-2" placeholder="Año" id="asignadoEditar">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" id="guardarEditar">Guardar cambios</button>
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


        <script src="../JavaScript/buttons-CRUD.js"></script>    </div>
</body>
</html>
