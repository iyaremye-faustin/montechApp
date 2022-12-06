import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import indexRouter from './routes/index';
import {
  handleErrorResponse,
} from '../core/helpers/responseHelper';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MovieApp API',
      version: '1.0.0',
      description: 'Movie App CRUD API '
    },
    path: {},
    security: [
      {
        bearerAuth: []
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'authorization',
          in: 'header'
        }
      }
    },
    servers: [
      {
        url: 'https://montech.onrender.com',
        description: 'API Server'
      } 
    ]
  },
  apis: ['./**/*.yaml']
};

const app = express();
const specs = swaggerJsDoc(options);
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('*', (req, res) => {
  return handleErrorResponse(res, 404, 'Route Not Found', [], false);
});

export default app;
