// middleware/authSwagger.js
const auth = require('basic-auth');

const swaggerAuth = (req, res, next) => {
  const user = auth(req);

  const swaggerUser = process.env.SWAGGER_USER || 'user';
  const swaggerPass = process.env.SWAGGER_PASS || 'user123';

  if (!user || user.name !== swaggerUser || user.pass !== swaggerPass) {
    res.set('WWW-Authenticate', 'Basic realm="Swagger API Documentation"');
    return res.status(401).send('Authentication required.');
  }

  next();
};

module.exports = swaggerAuth;
