// app.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import customerRoutes from './routes/customers.routes';  // Make sure the path is correct
import apiLimiter from './middleware/api-limiter.middleware';  // Make sure this middleware is properly configured
import orderRoutes from './routes/orders.routes';
import CLVRoutes from './routes/customer-lifetime-value.routes';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Analytics API',
      version: '1.0.0',
      description: 'API documentation for the Analytics Service',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Adjust the path if needed
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api/customers',apiLimiter, customerRoutes); // Mounting customer routes
app.use('/api/orders',apiLimiter, orderRoutes); // Mounting customer routes
app.use('/api/clv',apiLimiter, CLVRoutes); // Mounting customer routes

export default app;
