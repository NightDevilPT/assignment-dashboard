// src/services/order.service.ts

import Order from "../models/order.model";

export class OrderService {
  async getTotalSalesOverTime(interval: string) {
    const intervalMapping: Record<string, string> = {
      daily: "day",
      monthly: "month",
      quarterly: "quarter",
      yearly: "year"
    };

    const validInterval = intervalMapping[interval] || "day"; // Default to 'day' if not specified

    const pipeline:any = [
      {
        // Convert 'created_at' from string to date
        $addFields: {
          created_at_date: {
            $dateFromString: {
              dateString: "$created_at"
            }
          }
        }
      },
      {
        // Now group using the converted date
        $group: {
          _id: {
            $dateTrunc: {
              date: "$created_at_date",
              unit: validInterval
            }
          },
          totalSales: {
            $sum: {
              $toDouble: "$total_price_set.shop_money.amount" // Ensure this field is a string that can be converted to double
            }
          }
        }
      },
      {
        $sort: { '_id': 1 } // Sort by date ascending
      }
    ];

    return Order.aggregate(pipeline).exec();
  }

  async getSalesGrowthRate(interval: string) {
    const intervalMapping: Record<string, string> = {
      daily: "day",
      monthly: "month",
      quarterly: "quarter",
      yearly: "year"
    };

    const validInterval = intervalMapping[interval] || "month"; // Default to 'month' if not specified

    const pipeline:any = [
      {
        $match: {
          created_at: { $exists: true }
        }
      },
      {
        $addFields: {
          created_at_date: { $dateFromString: { dateString: "$created_at" } }
        }
      },
      {
        $group: {
          _id: {
            $dateTrunc: {
              date: "$created_at_date",
              unit: validInterval
            }
          },
          totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $setWindowFields: {
          sortBy: { _id: 1 },
          output: {
            previousSales: { $shift: { output: "$totalSales", by: -1, default: null } }
          }
        }
      },
      {
        $project: {
          _id: 0,
          period: "$_id",
          totalSales: 1,
          growthRate: {
            $cond: {
              if: { $not: ["$previousSales"] },
              then: null,
              else: {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ["$totalSales", "$previousSales"] },
                      "$previousSales"
                    ]
                  },
                  100
                ]
              }
            }
          }
        }
      }
    ];

    return Order.aggregate(pipeline).exec();
  }


  async getRepeatCustomers(interval: string) {
    const intervalMapping: Record<string, string> = {
      daily: "day",
      monthly: "month",
      quarterly: "quarter",
      yearly: "year"
    };

    const validInterval = intervalMapping[interval] || "month"; // Default to 'month' if not specified

    const pipeline:any = [
      {
        $match: {
          "customer.id": { $exists: true }, // Ensure the customer ID exists
          "created_at": { $exists: true }   // Ensure created_at exists
        }
      },
      {
        $addFields: {
          converted_date: {
            $dateFromString: {
              dateString: "$created_at",
              onError: null  // Handle any conversion errors
            }
          }
        }
      },
      {
        $match: {
          "converted_date": { $ne: null } // Ensure only successfully converted dates are processed
        }
      },
      {
        $group: {
          _id: {
            customer: "$customer.id",
            period: {
              $dateTrunc: {
                date: "$converted_date", // Use the correctly converted date
                unit: validInterval
              }
            }
          },
          orders: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.period",
          customers: { $sum: 1 },
          repeatCustomers: {
            $sum: {
              $cond: [{ $gt: ["$orders", 1] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ];

    return Order.aggregate(pipeline).exec();
  }
}
