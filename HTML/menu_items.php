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
    <title>QuickQuote Catering - Menu Items</title>
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
                <li><a href="menu.php"><i class="fa fa-file sidebar-icon"></i> Menús</a></li>
                <li><a href="menu_items.php"><i class="fa fa-utensils sidebar-icon"></i> Ítems del Menú</a></li>
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
                        <span class="page-title"><i class="fa fa-utensils sidebar-icon"></i> Ítems del Menú</span>
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

                    <!-- Filtros -->
                    <div class="row filter-block">
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" class="form-control" name="name" id="name" placeholder="">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="category">Categoría</label>
                                <input type="text" class="form-control" name="category" id="category" placeholder="">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="price">Precio</label>
                                <input type="text" class="form-control" name="price" id="price" placeholder="">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="status">Estado</label>
                                <input type="text" class="form-control" name="status" id="status" placeholder="">
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-secondary tab-nav-btn disabled-btn" type="button" disabled><i class="fa fa-chevron-left"></i></button>
                    <button class="btn btn-secondary tab-nav-btn" type="button"><i class="fa fa-chevron-right"></i></button>
                    <br /><br />

                    <!-- Tabla -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="cust-table-cont">
                                <div class="table-responsive">
                                    <table border="0" class="table cust-table">
                                        <thead>
                                            <tr>
                                                <th style="width:80px;">Id</th>
                                                <th style="width:250px;">Nombre</th>
                                                <th style="width:400px;">Descripción</th>
                                                <th style="width:150px;">Precio</th>
                                                <th style="width:150px;">Categoría</th>
                                                <th style="width:100px;" class="text-center">Activo</th>
                                                <th style="width:150px;" class="text-center"><i class="fa fa-gear"></i></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tabla_menu_items">
                                            <!-- Las filas se cargarán dinámicamente -->
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
                        <h5 class="modal-title" id="nuevoModalLabel">Nuevo Ítem de Menú</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="nuevoForm" method="post" action="../php/adm_menu_item_create.php">
                            <input type="text" name="name" class="form-control mb-2" placeholder="Nombre del ítem" id="name_new" required>
                            <textarea name="description" class="form-control mb-2" placeholder="Descripción" id="description_new" required></textarea>
                            <input type="number" step="0.01" name="price" class="form-control mb-2" placeholder="Precio" id="price_new" required>
                            

                            <label for="is_active_new">Activo:</label>
                            <select name="is_active" class="form-control mb-2" id="is_active_new" required>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
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
                        <h5 class="modal-title" id="editarModalLabel">Editar Ítem de Menú</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm" method="post" action="../php/adm_menu_item_update.php">
                            <input type="hidden" name="id" id="id_edit">
                            <input type="text" name="name" class="form-control mb-2" placeholder="Nombre del ítem" id="name_edit" required>
                            <textarea name="description" class="form-control mb-2" placeholder="Descripción" id="description_edit" required></textarea>
                            <input type="number" step="0.01" name="price" class="form-control mb-2" placeholder="Precio" id="price_edit" required>
                            <label for="category_id_edit">Categoría:</label>
                            <select name="category_id" class="form-control mb-2" id="category_id_edit" required>
                                <?php
                                $stmt = $pdo->query("SELECT id, name FROM menu_categories ORDER BY name");
                                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                    echo "<option value='{$row['id']}'>{$row['name']}</option>";
                                }
                                ?>
                            </select>
                            <label for="is_active_edit">Activo:</label>
                            <select name="is_active" class="form-control mb-2" id="is_active_edit" required>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
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
                        <h5 class="modal-title" id="eliminarModalLabel">Eliminar Ítem de Menú</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de eliminar el ítem con el nombre <span id="nombreEliminar"></span>?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../JavaScript/menu_items_CRUD.js"></script>
</body>
</html>
