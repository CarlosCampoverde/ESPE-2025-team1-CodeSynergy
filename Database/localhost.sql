-- Create database
CREATE DATABASE IF NOT EXISTS `catering` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `catering`;

-- Table 1: users
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `role` ENUM('client', 'admin') DEFAULT 'client',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table 2: events
CREATE TABLE `events` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `event_type` VARCHAR(100) NOT NULL,
    `event_date` DATE NOT NULL,
    `location` VARCHAR(150),
    `guests` INT,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- Table 3: menus
CREATE TABLE `menus` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `price_per_person` DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- Table 4: services
CREATE TABLE `services` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `unit_price` DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- Table 5: quotes
CREATE TABLE `quotes` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT NOT NULL,
    `total` DECIMAL(10,2),
    `quote_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('pending', 'sent', 'downloaded') DEFAULT 'pending',
    FOREIGN KEY (`event_id`) REFERENCES `events`(`id`)
) ENGINE=InnoDB;

-- Table 6: quote_menus
CREATE TABLE `quote_menus` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `quote_id` INT NOT NULL,
    `menu_id` INT NOT NULL,
    `people_count` INT NOT NULL,
    `subtotal` DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`),
    FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`)
) ENGINE=InnoDB;

-- Table 7: quote_services
CREATE TABLE `quote_services` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `quote_id` INT NOT NULL,
    `service_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `subtotal` DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`),
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`)
) ENGINE=InnoDB;

-- Table 8: reports
CREATE TABLE `reports` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `admin_id` INT NOT NULL,
    `report_type` ENUM('quotes', 'menus', 'users', 'services'),
    `description` TEXT,
    `generated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- Table 9: access_logs
CREATE TABLE `access_logs` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `action` VARCHAR(100),
    `description` TEXT,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

-- Table 10: pdf_files
CREATE TABLE `pdf_files` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `quote_id` INT NOT NULL,
    `file_path` VARCHAR(255),
    `sent_by_email` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`)
) ENGINE=InnoDB;

-- Table 11: comments
CREATE TABLE `comments` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `quote_id` INT,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`)
) ENGINE=InnoDB;

