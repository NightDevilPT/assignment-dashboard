import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Interface for Price Set
interface IPriceSet {
  shop_money: {
    amount: string;
    currency_code: string;
  };
  presentment_money: {
    amount: string;
    currency_code: string;
  };
}

// Interface for Line Item
interface ILineItem {
  id: mongoose.Types.ObjectId;
  variant_id: mongoose.Types.ObjectId;
  title: string;
  quantity: number;
  sku: string;
  variant_title: string;
  vendor: string;
  fulfillment_service: string;
  product_id: mongoose.Types.ObjectId;
  requires_shipping: boolean;
  taxable: boolean;
  gift_card: boolean;
  name: string;
  variant_inventory_management: string;
  properties: any[];
  product_exists: boolean;
  fulfillable_quantity: number;
  grams: number;
  price: number;
  total_discount: string;
  fulfillment_status: string | null;
  price_set: IPriceSet;
  total_discount_set: IPriceSet;
  discount_allocations: any[];
  duties: any[];
  admin_graphql_api_id: string;
}

// Interface for Customer
interface ICustomer {
  id: mongoose.Types.ObjectId;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  orders_count: number;
  state: string;
  total_spent: string;
  last_order_id: mongoose.Types.ObjectId;
  note: string | null;
  verified_email: boolean;
  multipass_identifier: string | null;
  tax_exempt: boolean;
  phone: string | null;
  tags: string;
  last_order_name: string;
  currency: string;
  marketing_opt_in_level: string | null;
  tax_exemptions: string[];
  admin_graphql_api_id: string;
  default_address: {
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
  };
}

// Interface for the main Order document
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  id: mongoose.Types.ObjectId;
  email: string;
  closed_at: Date | null;
  created_at: Date;
  updated_at: Date;
  number: number;
  note: string | null;
  token: string;
  gateway: string;
  test: boolean;
  total_price: string;
  subtotal_price: string;
  total_weight: number;
  total_tax: string;
  taxes_included: boolean;
  currency: string;
  financial_status: string;
  confirmed: boolean;
  total_discounts: string;
  buyer_accepts_marketing: boolean;
  name: string;
  referring_site: string | null;
  landing_site: string | null;
  cancelled_at: Date | null;
  cancel_reason: string | null;
  reference: string | null;
  user_id: mongoose.Types.ObjectId | null;
  location_id: mongoose.Types.ObjectId | null;
  source_identifier: string | null;
  source_url: string | null;
  device_id: string | null;
  phone: string | null;
  customer_locale: string;
  app_id: number;
  browser_ip: string;
  landing_site_ref: string | null;
  order_number: mongoose.Types.ObjectId;
  discount_applications: any[];
  discount_codes: any[];
  note_attributes: any[];
  payment_gateway_names: string[];
  processing_method: string;
  source_name: string;
  fulfillment_status: string | null;
  tax_lines: any[];
  tags: string;
  contact_email: string | null;
  order_status_url: string;
  presentment_currency: string;
  total_line_items_price_set: IPriceSet;
  total_discounts_set: IPriceSet;
  total_shipping_price_set: IPriceSet;
  subtotal_price_set: IPriceSet;
  total_price_set: IPriceSet;
  total_tax_set: IPriceSet;
  line_items: ILineItem[];
  shipping_lines: any[];
  billing_address: any | null;
  shipping_address: any | null;
  fulfillments: any[];
  client_details: any | null;
  refunds: any[];
  customer: ICustomer;
  total_line_items_price: string;
}

// Schema for Price Set
const PriceSetSchema: Schema = new Schema({
  shop_money: {
    amount: { type: String, required: true },
    currency_code: { type: String, required: true },
  },
  presentment_money: {
    amount: { type: String, required: true },
    currency_code: { type: String, required: true },
  },
});

// Schema for Line Item
const LineItemSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  variant_id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  sku: { type: String, default: "" },
  variant_title: { type: String, required: true },
  vendor: { type: String, required: true },
  fulfillment_service: { type: String, required: true },
  product_id: { type: Schema.Types.ObjectId, required: true },
  requires_shipping: { type: Boolean, required: true },
  taxable: { type: Boolean, required: true },
  gift_card: { type: Boolean, required: true },
  name: { type: String, required: true },
  variant_inventory_management: { type: String, required: true },
  properties: { type: Array, default: [] },
  product_exists: { type: Boolean, required: true },
  fulfillable_quantity: { type: Number, required: true },
  grams: { type: Number, required: true },
  price: { type: Number, required: true },
  total_discount: { type: String, required: true },
  fulfillment_status: { type: String, default: null },
  price_set: { type: PriceSetSchema, required: true },
  total_discount_set: { type: PriceSetSchema, required: true },
  discount_allocations: { type: Array, default: [] },
  duties: { type: Array, default: [] },
  admin_graphql_api_id: { type: String, required: true },
});

// Schema for Customer
const CustomerSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  orders_count: { type: Number, required: true },
  state: { type: String, required: true },
  total_spent: { type: String, required: true },
  last_order_id: { type: Schema.Types.ObjectId, required: true },
  note: { type: String, default: null },
  verified_email: { type: Boolean, required: true },
  multipass_identifier: { type: String, default: null },
  tax_exempt: { type: Boolean, required: true },
  phone: { type: String, default: null },
  tags: { type: String, default: "" },
  last_order_name: { type: String, required: true },
  currency: { type: String, default: "" },
  marketing_opt_in_level: { type: String, default: null },
  tax_exemptions: { type: [String], default: [] },
  admin_graphql_api_id: { type: String, required: true },
  default_address: {
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
  },
});

// Schema for Order
const OrderSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  closed_at: { type: Date, default: null },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  number: { type: Number, required: true },
  note: { type: String, default: null },
  token: { type: String, default: "" },
  gateway: { type: String, required: true },
  test: { type: Boolean, required: true },
  total_price: { type: String, required: true },
  subtotal_price: { type: String, required: true },
  total_weight: { type: Number, required: true },
  total_tax: { type: String, required: true },
  taxes_included: { type: Boolean, required: true },
  currency: { type: String, required: true },
  financial_status: { type: String, required: true },
  confirmed: { type: Boolean, required: true },
  total_discounts: { type: String, required: true },
  buyer_accepts_marketing: { type: Boolean, required: true },
  name: { type: String, required: true },
  referring_site: { type: String, default: null },
  landing_site: { type: String, default: null },
  cancelled_at: { type: Date, default: null },
  cancel_reason: { type: String, default: null },
  reference: { type: String, default: null },
  user_id: { type: Schema.Types.ObjectId, default: null },
  location_id: { type: Schema.Types.ObjectId, default: null },
  source_identifier: { type: String, default: null },
  source_url: { type: String, default: null },
  device_id: { type: String, default: null },
  phone: { type: String, default: null },
  customer_locale: { type: String, required: true },
  app_id: { type: Number, required: true },
  browser_ip: { type: String, default: "" },
  landing_site_ref: { type: String, default: null },
  order_number: { type: Schema.Types.ObjectId, required: true },
  discount_applications: { type: Array, default: [] },
  discount_codes: { type: Array, default: [] },
  note_attributes: { type: Array, default: [] },
  payment_gateway_names: { type: [String], required: true },
  processing_method: { type: String, required: true },
  source_name: { type: String, required: true },
  fulfillment_status: { type: String, default: null },
  tax_lines: { type: Array, default: [] },
  tags: { type: String, default: "" },
  contact_email: { type: String, default: null },
  order_status_url: { type: String, default: "" },
  presentment_currency: { type: String, required: true },
  total_line_items_price_set: { type: PriceSetSchema, required: true },
  total_discounts_set: { type: PriceSetSchema, required: true },
  total_shipping_price_set: { type: PriceSetSchema, required: true },
  subtotal_price_set: { type: PriceSetSchema, required: true },
  total_price_set: { type: PriceSetSchema, required: true },
  total_tax_set: { type: PriceSetSchema, required: true },
  line_items: { type: [LineItemSchema], required: true },
  shipping_lines: { type: Array, default: [] },
  billing_address: { type: Schema.Types.Mixed, default: null },
  shipping_address: { type: Schema.Types.Mixed, default: null },
  fulfillments: { type: Array, default: [] },
  client_details: { type: Schema.Types.Mixed, default: null },
  refunds: { type: Array, default: [] },
  customer: { type: CustomerSchema, required: true },
  total_line_items_price: { type: String, required: true },
},{collection:'shopifyOrders'});

// Create the Order model
const Order: Model<IOrder> = model<IOrder>('Orders', OrderSchema);

export default Order;
