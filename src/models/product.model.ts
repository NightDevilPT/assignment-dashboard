import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Interface for Product Option
interface IProductOption {
  id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  name: string;
  position: number;
  values: string[];
}

// Interface for Product Variant
interface IProductVariant {
  id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  title: string;
  price: number;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: number | null;
  fulfillment_service: string;
  inventory_management: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string | null;
  grams: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: mongoose.Types.ObjectId;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
  image_id: mongoose.Types.ObjectId | null;
}

// Interface for the main Product document
export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  admin_graphql_api_id: string;
  body_html: string | null;
  created_at: Date;
  handle: string;
  id: mongoose.Types.ObjectId;
  image: string | null;
  images: string[];
  options: IProductOption[];
  product_type: string;
  published_at: Date | null;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: string | null;
  title: string;
  updated_at: Date;
  variants: IProductVariant[];
  vendor: string;
}

// Schema for Product Option
const ProductOptionSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  product_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  position: { type: Number, required: true },
  values: { type: [String], required: true },
});

// Schema for Product Variant
const ProductVariantSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  product_id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, default: "" },
  position: { type: Number, required: true },
  inventory_policy: { type: String, required: true },
  compare_at_price: { type: Number, default: null },
  fulfillment_service: { type: String, required: true },
  inventory_management: { type: String, default: null },
  option1: { type: String, required: true },
  option2: { type: String, default: null },
  option3: { type: String, default: null },
  created_at: { type: String, default: "" },
  updated_at: { type: String, default: "" },
  taxable: { type: Boolean, required: true },
  barcode: { type: String, default: null },
  grams: { type: Number, required: true },
  weight: { type: Number, required: true },
  weight_unit: { type: String, required: true },
  inventory_item_id: { type: Schema.Types.ObjectId, required: true },
  inventory_quantity: { type: Number, required: true },
  old_inventory_quantity: { type: Number, required: true },
  requires_shipping: { type: Boolean, required: true },
  admin_graphql_api_id: { type: String, required: true },
  image_id: { type: Schema.Types.ObjectId, default: null },
});

// Schema for Product
const ProductSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  admin_graphql_api_id: { type: String, required: true },
  body_html: { type: String, default: null },
  created_at: { type: Date, required: true },
  handle: { type: String, required: true },
  id: { type: Schema.Types.ObjectId, required: true },
  image: { type: String, default: null },
  images: { type: [String], default: [] },
  options: { type: [ProductOptionSchema], required: true },
  product_type: { type: String, required: true },
  published_at: { type: Date, default: null },
  published_scope: { type: String, required: true },
  status: { type: String, required: true },
  tags: { type: String, default: "" },
  template_suffix: { type: String, default: null },
  title: { type: String, required: true },
  updated_at: { type: Date, required: true },
  variants: { type: [ProductVariantSchema], required: true },
  vendor: { type: String, required: true },
},{collection:'shopifyProducts'});

// Create the Product model
const Product: Model<IProduct> = model<IProduct>('Products', ProductSchema);

export default Product;
