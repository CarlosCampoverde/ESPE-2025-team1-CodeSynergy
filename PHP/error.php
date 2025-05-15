<?php
// Capturar mensaje de error desde la URL
$error_message = isset($_GET['error_message']) ? $_GET['error_message'] : 'Ha ocurrido un error desconocido.';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error</title>
    <style>
        @font-face {
            font-family: 'Red Hat Mono';
            src: url(https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/font.css);
        }
        
        * {
            font-family: 'Red Hat Mono', monospace;
            margin: 0px;
            padding: 0px;
        }
        
        :root {
            --First-color: #00000033;
            --Second-color: #066;
            --third-color: #077;
        }
        
        body,
        html {
            width: 100%;
            height: 100%;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url("https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/background.svg");
            background-size: cover;
            background-position: center center;
        }
        
        .error-container {
            width: 320px;
            background: linear-gradient(15deg, rgba(255, 0, 0, 0.76), rgb(83, 1, 1)); /* Degradado rojo */
            height: auto;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            backdrop-filter: blur(10px);
            text-align: center;
            color: white;
            border: 1px solid rgba(220, 8, 8, 0.7);
        }
        
        h1 {
            color: #d32f2f;
            margin-bottom: 20px;
        }

        p {
            color: #fff;
            font-size: 16px;
            margin-bottom: 20px;
        }

        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: var(--third-color);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background 0.3s;
        }

        a:hover {
            background-color: var(--Second-color);
        }

        @media screen and (max-width: 320px) {
            .error-container {
                left: 160px;
            }
        }

        @media screen and (max-height: 500px) {
            .error-container {
                top: 250px;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>Ocurrió un error</h1>
        <p><?php echo htmlspecialchars($error_message); ?></p>
        <a href="../index.php">Volver al login</a>
    </div>
</body>
</html>
