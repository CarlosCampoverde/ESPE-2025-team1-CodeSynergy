<?php

class Connection {
    private $host = 'localhost';
    private $dbname = 'CATERING';
    private $username = 'david';
    private $password = 'admin';
     //private $username = 'root';
     //private $password = 'adminadmin';

    public function connect() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname}";
            return new PDO($dsn, $this->username, $this->password);
        } catch (\Throwable $th) {
            // Captura cualquier error y muestra
            $error_message = "Error en la conexión: " . $th->getMessage();
            header("Location: error.php?error_message=" . urlencode($error_message));
            exit;
        }
    }
}
?>
