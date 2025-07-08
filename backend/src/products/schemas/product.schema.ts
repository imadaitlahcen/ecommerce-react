import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true, min: 0 })
  minStock: number;

  @Prop({ required: true, trim: true, unique: true })
  sku: string;

  @Prop({ required: true, trim: true })
  brand: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: 0 })
  weight: number;

  @Prop()
  dimensions: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  soldCount: number;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isOnSale: boolean;

  @Prop({ min: 0, max: 100 })
  discountPercentage?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product); 