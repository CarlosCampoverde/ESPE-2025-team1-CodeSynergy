<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style_login.css">
    <link rel="stylesheet" href="https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/font.css">
    <title>Login and Signup</title>
</head>

<body>
    <div id="container">
        <div class="main" id="main">
            <input type="checkbox" id="chk">

            <div class="signup">
                 <form action="php/signup_status.php" method="POST">
                    <label for="chk" class="sig">Registro</label>

                    <div class="user-box">
                        <input type="text" title="Enter Username" id="username" name="username" required autocomplete="off">
                        <label id="usernameLabel">Username</label>
                        <img src="https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/logo.svg" alt="Logo" class="logo-img" id="userIcon" />
                    </div>

                    <div class="user-box">
                        <input type="email" title="Enter email" id="email" name="email" required autocomplete="off">
                        <label id="emailLabel">Email</label>
                        <img src="https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/logo.svg" alt="Logo" class="logo-img" id="emailIcon">
                    </div>

                    <div class="user-box">
                        <input type="password" title="Enter password" id="password" name="password" required autocomplete="off">
                        <label id="passwordLabel">Contraseña</label>
                        <img src="https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/logo.svg" alt="Logo" class="logo-img" id="passIcon">
                    </div>

                    <button type="submit" id="button">Registrar</button>
                
                </form>
            </div>

            <div class="login">
                <form action="php/login_status.php" method="POST">
                
                    <label for="chk" class="log">Login</label>

                    <div class="user-box">
                        <input type="text" title="Enter Username" id="username2" name="username" required>
                        <label>Username</label>
                    </div>

                    <div class="user-box">
                        <input type="password" title="Enter password" id="password2" name="password" required>
                        <label>Contraseña</label>
                    </div>

                    <button type="submit" id="button2">Login</button>
                
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://raw.githubusercontent.com/Ahmed-Massoud/Login-and-sign-up-form/main/sweetalert.min.js"></script>
</body>

</html>
