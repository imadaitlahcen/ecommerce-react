import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  sku: string;
}

@Schema({ _id: false })
export class ShippingAddress {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  phone?: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ type: ShippingAddress, required: true })
  shippingAddress: ShippingAddress;

  @Prop({ required: true, default: 'pending' })
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ required: true, min: 0 })
  tax: number;

  @Prop({ required: true, min: 0 })
  shippingCost: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ required: true, default: 'card' })
  paymentMethod: 'card' | 'paypal' | 'cash';

  @Prop({ required: true, default: 'pending' })
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';

  @Prop()
  paymentId?: string;

  @Prop()
  trackingNumber?: string;

  @Prop()
  estimatedDelivery?: Date;

  @Prop()
  deliveredAt?: Date;

  @Prop()
  returnReason?: string;

  @Prop()
  returnDate?: Date;

  @Prop()
  notes?: string;

  @Prop({ default: false })
  isReturned: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order); 