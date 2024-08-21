// routers/customerRouter.js (or .ts if TypeScript)
import express from 'express';
import { CustomerController } from '../controllers/customer.controller';

const customerRoutes = express.Router();  // Use camelCase for consistency
const customerController = new CustomerController();

customerRoutes.get('/new-customers', customerController.getNewCustomers);
customerRoutes.get('/geographical-distribution', customerController.getCustomerDistributionByCity);

export default customerRoutes;
