// src/controllers/clvController.ts

import { Request, Response } from 'express';
import { CLVService } from '../services/customer-lifetime.service';

export class CLVController {
  private clvService: CLVService;

  constructor() {
    this.clvService = new CLVService();
  }

  /**
   * @swagger
   * /clv/customer-lifetime-value:
   *   get:
   *     summary: Returns Customer Lifetime Value by cohorts
   *     description: Calculates the total lifetime value of customers grouped by the month of their first purchase.
   *     responses:
   *       200:
   *         description: An array of cohort lifetime values.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   cohort:
   *                     type: string
   *                     description: The month of the first purchase
   *                   totalValue:
   *                     type: number
   *                     description: Total lifetime value for the cohort
   */
  public getCLV = async (req: Request, res: Response): Promise<void> => {
    try {
      const clvData = await this.clvService.calculateCLV();
      res.json(clvData);
    } catch (error:any) {
      res.status(500).send(error.message);
    }
  };
}
