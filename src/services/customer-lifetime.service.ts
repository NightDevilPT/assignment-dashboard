// src/services/clvService.ts

import mongoose from 'mongoose';
import Order from '../models/order.model';
import Customer from '../models/customer.model';

export class CLVService {
  async calculateCLV() {
    const cohorts = await Customer.aggregate([
      {
        $project: {
          cohort: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
          _id: 1
        }
      }
    ]);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: Customer.collection.name,
          localField: 'customer.id',
          foreignField: '_id',
          as: 'customerData'
        }
      },
      {
        $unwind: '$customerData'
      },
      {
        $group: {
          _id: '$customerData.cohort',
          totalValue: { $sum: { $toDouble: '$total_price_set.shop_money.amount' } }
        }
      }
    ]);

    return orders;
  }
}
