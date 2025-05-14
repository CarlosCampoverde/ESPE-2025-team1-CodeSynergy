<?php

class Connection {
    private $host = 'localhost';
    private $dbname = 'catering';
    private $username = 'admin';
    private $password = 'admin';

    public function connect() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname}";
            return new PDO($dsn, $this->username, $this->password);
        } catch (\Throwable $th) {
            // Captura cualquier error y muestra
            echo "Error en la conexión: " . $th->getMessage();
            exit;
        }
    }
}
?>
