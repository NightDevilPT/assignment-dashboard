// src/services/customer.service.ts

import Customer from "../models/customer.model";

export class CustomerService {
  async getNewCustomers(interval: string | undefined) {
    const intervalMapping: Record<string, string> = {
      daily: "day",  // Maps 'daily' to 'day'
      monthly: "month",
      yearly: "year"
    };

    const validInterval = interval && intervalMapping[interval?.toLowerCase()]
      ? intervalMapping[interval.toLowerCase()]
      : "day";

    const pipeline:any = [
      {
        $match: {
          created_at: { $exists: true } // Ensure created_at exists
        }
      },
      {
        // Convert created_at from a string to a date
        $addFields: {
          created_at_date: { $dateFromString: { dateString: "$created_at" } }
        }
      },
      {
        $group: {
          _id: {
            $dateTrunc: {
              date: "$created_at_date",
              unit: validInterval,
            }
          },
          newCustomers: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ];

    return Customer.aggregate(pipeline).exec();
  }

  async getCustomerDistributionByCity() {
    const pipeline:any = [
      {
        $group: {
          _id: "$default_address.city",
          customerCount: { $sum: 1 }
        }
      },
      {
        $sort: { customerCount: -1 }  // Optional: sorts the result by customer count in descending order
      }
    ];

    return Customer.aggregate(pipeline).exec();
  }
}
