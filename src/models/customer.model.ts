import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Interface for the Address sub-document
interface IAddress {
  id: mongoose.Types.ObjectId;
  customer_id: mongoose.Types.ObjectId;
  first_name: string;
  last_name: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
  name: string;
  province_code: string | null;
  country_code: string;
  country_name: string;
  default: boolean;
}

// Interface for the main Customer document
export interface ICustomer extends Document {
  admin_graphql_api_id: string;
  created_at: Date;
  currency: string;
  default_address: IAddress;
  email: string;
  email_marketing_consent: {
    state: string;
    opt_in_level: string;
    consent_updated_at: Date | null;
  };
  first_name: string;
  last_name: string;
  last_order_id: mongoose.Types.ObjectId | null;
  last_order_name: string | null;
  multipass_identifier: string | null;
  note: string | null;
  orders_count: number;
  phone: string | null;
  sms_marketing_consent: {
    state: string;
    opt_in_level: string;
    consent_updated_at: Date | null;
  } | null;
  state: string;
  tags: string;
  tax_exempt: boolean;
  tax_exemptions: string[];
  total_spent: string;
  updated_at: Date;
  verified_email: boolean;
  addresses: IAddress[];
}

// Schema for Address
const AddressSchema: Schema<IAddress> = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  customer_id: { type: Schema.Types.ObjectId, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  company: { type: String, default: null },
  address1: { type: String, required: true },
  address2: { type: String, default: null },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, default: null },
  name: { type: String, default: "" },
  province_code: { type: String, default: null },
  country_code: { type: String, default: "" },
  country_name: { type: String, default: "" },
  default: { type: Boolean, required: true },
});

// Schema for Customer
const CustomerSchema: Schema<ICustomer> = new Schema({
  admin_graphql_api_id: { type: String, required: true },
  created_at: { type: Date, required: true },
  currency: { type: String, default: "" },
  default_address: { type: AddressSchema, required: true },
  email: { type: String, required: true },
  email_marketing_consent: {
    state: { type: String, required: true },
    opt_in_level: { type: String, required: true },
    consent_updated_at: { type: Date, default: null },
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  last_order_id: { type: Schema.Types.ObjectId, default: null },
  last_order_name: { type: String, default: null },
  multipass_identifier: { type: String, default: null },
  note: { type: String, default: null },
  orders_count: { type: Number, required: true },
  phone: { type: String, default: null },
  sms_marketing_consent: {
    state: { type: String, required: true },
    opt_in_level: { type: String, required: true },
    consent_updated_at: { type: Date, default: null },
  },
  state: { type: String, required: true },
  tags: { type: String, default: "" },
  tax_exempt: { type: Boolean, required: true },
  tax_exemptions: { type: [String], required: true },
  total_spent: { type: String, required: true },
  updated_at: { type: Date, required: true },
  verified_email: { type: Boolean, required: true },
  addresses: { type: [AddressSchema], required: true },
}, { collection: 'shopifyCustomers' });

// Create the Customer model
const Customer: Model<ICustomer> = model<ICustomer>('Customer', CustomerSchema);

export default Customer;
