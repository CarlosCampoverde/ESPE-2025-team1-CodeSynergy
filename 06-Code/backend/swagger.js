// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de QuickQuote - CodeSynergy',
      version: '1.0.0',
      description: 'Documentación interactiva de la API REST de QuickQuote',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './routes/*.js', 
    './routesDocumentation/*.js'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
