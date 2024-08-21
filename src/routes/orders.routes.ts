// src/routes/orderRoutes.ts

import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get('/total-sales', orderController.getTotalSalesOverTime);
orderRoutes.get('/sales-growth', orderController.getSalesGrowthRate);
orderRoutes.get('/repeat-customers', orderController.getRepeatCustomers);

export default orderRoutes;
