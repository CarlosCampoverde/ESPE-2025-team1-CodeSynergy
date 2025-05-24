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
    <title>QuickQuote Catering - Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
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
                <li><a href="quote-form.php"><i class="fa fa-calendar-check-o sidebar-icon"></i> Cotización</a></li>
                <li><a href="clients.php"><i class="fa fa-users sidebar-icon"></i> Clientes</a></li>
                <li><a href="menu.php"><i class="fa fa-file sidebar-icon"></i> Menú</a></li>
                <li><a href="menu_items.php"><i class="fa fa-file sidebar-icon"></i> Items del Menú</a></li>
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
                        <span class="page-title"><i class="fa fa-th sidebar-icon"></i> Dashboard</span>
                        <div class="profile-pic"></div>
                    </div>
                </div>
            </header>
            <div class="page-content-wrapper">
                <div class="container-fluid">
                    <!-- Gráficos -->
                    <div class="row">
                        <!-- Cotizaciones por mes -->
                        <div class="col-md-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    Cotizaciones por Mes
                                    <select id="yearSelector" class="form-control d-inline-block w-auto ml-2">
                                        <!-- Años cargados dinámicamente -->
                                    </select>
                                </div>
                                <div class="card-body">
                                    <canvas id="quotesByMonthChart"></canvas>
                                </div>
                            </div>
                        </div>
                        <!-- Top 5 menús -->
                        <div class="col-md-6">
                            <div class="card mb-4">
                                <div class="card-header">Top 5 Menús Seleccionados</div>
                                <div class="card-body">
                                    <canvas id="topMenusChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Métricas -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mb-4">
                                <div class="card-header">Métricas Generales</div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h5>Ingresos Totales</h5>
                                            <p id="totalIncome">Cargando...</p>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Número de Eventos</h5>
                                            <p id="eventCount">Cargando...</p>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Clientes Nuevos</h5>
                                            <p id="newClients">Cargando...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Top Clientes y Búsqueda -->
                    <div class="row">
                        <!-- Top 5 Clientes -->
                        <div class="col-md-6">
                            <div class="card mb-4">
                                <div class="card-header">Top 5 Clientes</div>
                                <div class="card-body">
                                    <ul id="topClientsList" class="list-group">
                                        <!-- Clientes cargados dinámicamente -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- Búsqueda de Cliente -->
                        <div class="col-md-6">
                            <div class="card mb-4">
                                <div class="card-header">Buscar Cliente</div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="clientSearch" placeholder="Buscar por nombre del cliente">
                                    </div>
                                    <ul id="clientSearchResults" class="list-group"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Tabla de Cotizaciones -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mb-4">
                                <div class="card-header">Cotizaciones del Cliente</div>
                                <div class="card-body">
                                    <div class="cust-table-cont">
                                        <div class="table-responsive">
                                            <table class="table cust-table">
                                                <thead>
                                                    <tr>
                                                        <th style="width:100px;">ID</th>
                                                        <th style="width:200px;">Fecha</th>
                                                        <th style="width:150px;">Total</th>
                                                        <th style="width:150px;">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="clientQuotesTable">
                                                    <!-- Cotizaciones cargadas dinámicamente -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../JavaScript/dashboard.js"></script>
    <script>
        // Toggle sidebar
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $(".wrapper").toggleClass("toggled");
        });
    </script>
</body>
</html>