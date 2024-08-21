// src/controllers/orderController.ts

import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
	private orderService: OrderService;

	constructor() {
		this.orderService = new OrderService();
	}

	/**
	 * @swagger
	 * /orders/total-sales:
	 *   get:
	 *     summary: Retrieve total sales over time
	 *     description: Returns total sales aggregated by specified time intervals.
	 *     parameters:
	 *       - in: query
	 *         name: interval
	 *         required: true
	 *         schema:
	 *           type: string
	 *           enum: [daily, monthly, quarterly, yearly]
	 *         description: Interval to group sales (daily, monthly, quarterly, yearly).
	 *     responses:
	 *       200:
	 *         description: Total sales data aggregated by time intervals.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   _id:
	 *                     type: string
	 *                     description: Start of the interval
	 *                   totalSales:
	 *                     type: number
	 *                     description: Sum of sales in USD
	 */
	public getTotalSalesOverTime = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { interval } = req.query as any;
			const result = await this.orderService.getTotalSalesOverTime(
				interval || "daily"
			);
			res.json(result);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	};

	/**
	 * @swagger
	 * /orders/sales-growth:
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
	 *         description: Sales growth rate data.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   date:
	 *                     type: string
	 *                     description: Start of the interval
	 *                   totalSales:
	 *                     type: number
	 *                     description: Total sales for the interval
	 *                   growthRate:
	 *                     type: number
	 *                     description: Percentage growth compared to the previous period
	 */
	public getSalesGrowthRate = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { interval } = req.query as any;
			const result = await this.orderService.getSalesGrowthRate(
				interval || "monthly"
			);
			res.json(result);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	};

	/**
	 * @swagger
	 * /orders/repeat-customers:
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
	 *         description: Number of repeat customers.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 repeatCustomers:
	 *                   type: integer
	 *                   description: Total number of repeat customers
	 */
	public getRepeatCustomers = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const interval = (req.query.interval as string) || "monthly";
			const result = await this.orderService.getRepeatCustomers(interval);

			res.json(result);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	};
}
