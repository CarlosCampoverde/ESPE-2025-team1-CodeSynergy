-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-05-2025 a las 02:34:23
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catering`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `access_logs`
--

CREATE TABLE `access_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) DEFAULT NULL,
  `description` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `access_logs`
--

INSERT INTO `access_logs` (`id`, `user_id`, `action`, `description`, `timestamp`) VALUES
(1, 1, 'login', 'El administrador inició sesión', '2025-05-17 20:19:57'),
(2, 2, 'ver_cotizacion', 'El cliente vio la cotización #2', '2025-05-17 20:19:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `email`, `phone`, `address`, `created_at`) VALUES
(1, 'Carlos', 'Campoverde', 'carlos@ejemplo.com', '0987654321', 'Quito, Ecuador', '2025-05-17 20:19:57'),
(2, 'María', 'López', 'maria@ejemplo.com', '0911223344', 'Guayaquil, Ecuador', '2025-05-17 20:19:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `client_id`, `quote_id`, `message`, `created_at`) VALUES
(1, 1, 1, 'Por favor, actualicen las opciones de postre.', '2025-05-17 20:19:57'),
(2, 2, 2, '¡Todo está perfecto, gracias!', '2025-05-17 20:19:57'),
(3, 1, 1, '{\"descuento\": \"10% por más de 100 personas\"}', '2025-05-17 21:35:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `custom_menu_selections`
--

CREATE TABLE `custom_menu_selections` (
  `id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `unit_price` decimal(10,2) NOT NULL COMMENT 'Precio en el momento de la selección',
  `special_notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `event_type` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `guests` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `client_id`, `event_type`, `event_date`, `location`, `guests`) VALUES
(1, 1, 'Boda', '2025-07-12', 'Salón de Eventos Quito', 100),
(2, 2, 'Cumpleaños', '2025-08-20', 'Parque Samanes', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price_per_person` decimal(10,2) NOT NULL,
  `type` enum('predetermined','customizable','hybrid') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'predetermined',
  `is_active` tinyint(1) DEFAULT '1',
  `min_guests` int(11) DEFAULT '1',
  `max_guests` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`id`, `name`, `description`, `price_per_person`, `type`, `is_active`, `min_guests`, `max_guests`, `created_at`) VALUES
(1, 'Buffet Estándar', 'Incluye platos principales, guarniciones y bebidas. carne con papas ', '10.50', 'predetermined', 1, 1, NULL, '2025-05-17 21:26:14'),
(2, 'Buffet Premium', 'Incluye opciones gourmet y postres.', '18.00', 'predetermined', 1, 1, NULL, '2025-05-17 21:26:14'),
(3, 'Menú Personalizado', 'Elija sus componentes favoritos', '10.00', '', 1, 1, NULL, '2025-05-17 21:35:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_categories`
--

CREATE TABLE `menu_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_order` int(11) NOT NULL DEFAULT '0',
  `min_selections` int(11) NOT NULL DEFAULT '1' COMMENT 'Mínimo a seleccionar',
  `max_selections` int(11) DEFAULT NULL COMMENT 'Máximo a seleccionar (NULL para ilimitado)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `menu_categories`
--

INSERT INTO `menu_categories` (`id`, `name`, `display_order`, `min_selections`, `max_selections`) VALUES
(1, 'Entradas', 1, 1, 3),
(2, 'Platos Principales', 2, 1, NULL),
(3, 'Postres', 3, 0, 2),
(4, 'Bebidas', 4, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `allergens` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL COMMENT 'Precio base del item',
  `category_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL COMMENT 'ID del admin que creó el item',
  `is_active` tinyint(1) DEFAULT '1',
  `allow_quantity` tinyint(1) DEFAULT '0',
  `max_quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `description`, `image_url`, `allergens`, `price`, `category_id`, `created_by`, `is_active`, `allow_quantity`, `max_quantity`, `created_at`) VALUES
(1, 'Ensalada César', 'Ensalada fresca con aderezo césar', NULL, NULL, '3.50', 1, NULL, 1, 0, NULL, '2025-05-17 21:32:03'),
(2, 'Bruschettas', 'Pan tostado con tomate y albahaca', NULL, NULL, '4.00', 1, NULL, 1, 0, NULL, '2025-05-17 21:32:03'),
(3, 'Filete Mignon', 'Corte premium con salsa de hongos', NULL, NULL, '12.00', 2, NULL, 1, 0, NULL, '2025-05-17 21:32:03'),
(4, 'Tiramisú', 'Postre italiano clásico', NULL, NULL, '5.00', 3, NULL, 1, 0, NULL, '2025-05-17 21:32:03'),
(5, 'Carpaccio de Res', 'Finas láminas de res con rúcula y parmesano', NULL, NULL, '8.50', 1, NULL, 1, 0, NULL, '2025-05-17 21:56:25'),
(6, 'Risotto de Mariscos', 'Arroz cremoso con mezcla de mariscos', NULL, NULL, '14.00', 2, NULL, 1, 0, NULL, '2025-05-17 21:56:25'),
(7, 'Cheesecake de Frutos Rojos', 'Tarta de queso con coulis de frutos rojos', NULL, NULL, '6.50', 3, NULL, 1, 0, NULL, '2025-05-17 21:56:25'),
(8, 'Jugo Natural', 'Jugo fresco de frutas de temporada', NULL, NULL, '3.00', 4, NULL, 1, 0, NULL, '2025-05-17 21:56:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pdf_files`
--

CREATE TABLE `pdf_files` (
  `id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `sent_by_email` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pdf_files`
--

INSERT INTO `pdf_files` (`id`, `quote_id`, `file_path`, `sent_by_email`, `created_at`) VALUES
(1, 1, 'pdfs/cotizacion_1.pdf', 1, '2025-05-17 20:19:57'),
(2, 2, 'pdfs/cotizacion_2.pdf', 0, '2025-05-17 20:19:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `quote_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','sent','downloaded') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `quotes`
--

INSERT INTO `quotes` (`id`, `event_id`, `total`, `quote_date`, `status`) VALUES
(1, 1, '1500.00', '2025-05-17 20:19:57', 'pending'),
(2, 2, '650.00', '2025-05-17 20:19:57', 'sent');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quote_menus`
--

CREATE TABLE `quote_menus` (
  `id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL COMMENT 'NULL para menús personalizados',
  `people_count` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `quote_menus`
--

INSERT INTO `quote_menus` (`id`, `quote_id`, `menu_id`, `people_count`, `subtotal`) VALUES
(1, 1, 1, 100, '1050.00'),
(2, 2, 2, 50, '900.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quote_services`
--

CREATE TABLE `quote_services` (
  `id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `quote_services`
--

INSERT INTO `quote_services` (`id`, `quote_id`, `service_id`, `quantity`, `subtotal`) VALUES
(1, 1, 1, 3, '150.00'),
(2, 1, 2, 1, '120.00'),
(3, 2, 1, 1, '50.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `report_type` enum('quotes','menus','users','services') DEFAULT NULL,
  `description` text,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `reports`
--

INSERT INTO `reports` (`id`, `admin_id`, `report_type`, `description`, `generated_at`) VALUES
(1, 1, 'quotes', 'Resumen mensual de cotizaciones', '2025-05-17 20:19:57'),
(2, 1, 'users', 'Nuevos usuarios registrados', '2025-05-17 20:19:57'),
(3, 1, 'menus', 'Precio escalonado: 0-50: $10, 51-100: $9, 101+: $8', '2025-05-17 21:35:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `unit_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `has_duration` tinyint(1) DEFAULT '0',
  `has_quantity` tinyint(1) DEFAULT '1',
  `price_type` enum('fixed','per_hour','per_person') NOT NULL DEFAULT 'fixed',
  `min_guests` int(11) DEFAULT NULL,
  `max_guests` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `unit_price`, `is_active`, `has_duration`, `has_quantity`, `price_type`, `min_guests`, `max_guests`) VALUES
(1, 'Servicio de meseros', 'Meseros para atención durante el evento.', '50.00', 1, 0, 1, 'fixed', NULL, NULL),
(2, 'Decoración', 'Servicio de decoración del espacio del evento.', '120.00', 1, 0, 1, 'fixed', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('client','admin') DEFAULT 'client',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`) VALUES
(1, 'admin1', 'contrasena123hash', 'admin1@ejemplo.com', 'admin', '2025-05-17 20:19:56'),
(2, 'usuario_cliente', 'contrasena456hash', 'cliente1@ejemplo.com', 'client', '2025-05-17 20:19:56'),
(3, 'carlos', '$2y$10$Z9cFG8lZZcWqnXTZGtoZO.CXD4XUzkDcvZOY.bN5CabK80BobTBae', 'carlos80237@gmail.com', 'client', '2025-05-17 23:35:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `access_logs`
--
ALTER TABLE `access_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `quote_id` (`quote_id`);

--
-- Indices de la tabla `custom_menu_selections`
--
ALTER TABLE `custom_menu_selections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_id` (`quote_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indices de la tabla `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `idx_menu_items_active` (`is_active`,`category_id`);

--
-- Indices de la tabla `pdf_files`
--
ALTER TABLE `pdf_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_id` (`quote_id`);

--
-- Indices de la tabla `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indices de la tabla `quote_menus`
--
ALTER TABLE `quote_menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_id` (`quote_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indices de la tabla `quote_services`
--
ALTER TABLE `quote_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quote_id` (`quote_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `access_logs`
--
ALTER TABLE `access_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `custom_menu_selections`
--
ALTER TABLE `custom_menu_selections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pdf_files`
--
ALTER TABLE `pdf_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `quote_menus`
--
ALTER TABLE `quote_menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `quote_services`
--
ALTER TABLE `quote_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `access_logs`
--
ALTER TABLE `access_logs`
  ADD CONSTRAINT `access_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`);

--
-- Filtros para la tabla `custom_menu_selections`
--
ALTER TABLE `custom_menu_selections`
  ADD CONSTRAINT `custom_menu_selections_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `custom_menu_selections_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`id`);

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Filtros para la tabla `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`id`);

--
-- Filtros para la tabla `pdf_files`
--
ALTER TABLE `pdf_files`
  ADD CONSTRAINT `pdf_files_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`);

--
-- Filtros para la tabla `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Filtros para la tabla `quote_menus`
--
ALTER TABLE `quote_menus`
  ADD CONSTRAINT `quote_menus_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`),
  ADD CONSTRAINT `quote_menus_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`);

--
-- Filtros para la tabla `quote_services`
--
ALTER TABLE `quote_services`
  ADD CONSTRAINT `quote_services_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`),
  ADD CONSTRAINT `quote_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Filtros para la tabla `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
