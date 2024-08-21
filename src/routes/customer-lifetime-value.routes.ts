// src/routes/clvRoutes.ts

import { Router } from 'express';
import { CLVController } from '../controllers/customer-lifetime-value.controller';

const CLVRoutes = Router();
const clvController = new CLVController();

CLVRoutes.get('/clv', clvController.getCLV);

export default CLVRoutes;
