<?php
// Determinar la página actual (pasa este valor desde la página que incluye sidebar.php)
$currentPage = isset($currentPage) ? $currentPage : '';
?>
<div class="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="#">Bienvenido Administrador</a>
            <hr class="hr">
        </li>
        <br />
        <li>
            <a href="dashboard.php" class="<?php echo $currentPage === 'dashboard' ? 'active' : ''; ?>">
                <i class="fa fa-th sidebar-icon"></i> Aplicación
            </a>
        </li>
        <li>
            <a href="quote-form.php" class="<?php echo $currentPage === 'quote-form' ? 'active' : ''; ?>">
                <i class="fa fa-calendar-check-o sidebar-icon"></i> Cotización
            </a>
        </li>
        <li>
            <a href="clients.php" class="<?php echo $currentPage === 'clients' ? 'active' : ''; ?>">
                <i class="fa fa-users sidebar-icon"></i> Clientes
            </a>
        </li>
        <li>
            <a href="menu.php" class="<?php echo $currentPage === 'menu' ? 'active' : ''; ?>">
                <i class="fa fa-file sidebar-icon"></i> Menú
            </a>
        </li>
        <li>
            <a href="menu_items.php" class="<?php echo $currentPage === 'menu_items' ? 'active' : ''; ?>">
                <i class="fa fa-file sidebar-icon"></i> Items del Menú
            </a>
        </li>

        <li>
            <a href="../php/log_out.php" class="<?php echo $currentPage === 'log_out' ? 'active' : ''; ?>">
                <i class="fa fa-sign-out-alt sidebar-icon"></i> Cerrar sesión
            </a>
        </li>
    </ul>
</div>