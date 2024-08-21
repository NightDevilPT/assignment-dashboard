// src/controllers/customerController.ts

import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  /**
   * @swagger
   * /customers/new-customers:
   *   get:
	 *     summary: Calculate sales growth rate over time
	 *     description: Returns the percentage growth in sales for each interval compared to the previous interval.
	 *     parameters:
	 *       - in: query
	 *         name: interval
	 *         required: true
	 *         schema:
	 *           type: string
	 *           enum: [daily, monthly, quarterly, yearly]
	 *         description: Interval to calculate sales growth (daily, monthly, quarterly, yearly).
   *     responses:
   *       200:
   *         description: A list of new customers added over time, grouped by interval.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: object
   *                     properties:
   *                       date:
   *                         type: string
   *                         format: date-time
   *                   newCustomers:
   *                     type: integer
   */
  public getNewCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
      const interval = req.query.interval as string | undefined; // Handle undefined case
      if (!interval) {
        res.status(400).send("Interval parameter is required.");
        return;
      }
      const result = await this.customerService.getNewCustomers(interval);
      res.json(result);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  };


  /**
   * @swagger
   * /customers/geographical-distribution:
   *   get:
   *     summary: Get geographical distribution of customers by city
   *     description: Returns a count of customers grouped by city.
   *     responses:
   *       200:
   *         description: A list of cities with customer counts.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The city name
   *                   customerCount:
   *                     type: integer
   *                     description: Number of customers in the city
   */
  public getCustomerDistributionByCity = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.customerService.getCustomerDistributionByCity();
      res.json(result);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  };
}
