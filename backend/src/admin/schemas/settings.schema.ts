import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ required: true, default: 'TechStore' })
  storeName: string;

  @Prop({ required: true, default: 'Your one-stop shop for all things tech' })
  storeDescription: string;

  @Prop({ required: true, default: 'contact@techstore.com' })
  contactEmail: string;

  @Prop({ required: true, default: '+1 (555) 123-4567' })
  contactPhone: string;

  @Prop({ required: true, default: '123 Tech Street, Silicon Valley, CA 94025' })
  address: string;

  @Prop({ required: true, default: 'https://techstore.com' })
  website: string;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ required: true, default: 8.5 })
  taxRate: number;

  @Prop({ required: true, default: false })
  stripeEnabled: boolean;

  @Prop({ required: true, default: false })
  paypalEnabled: boolean;

  @Prop({ required: true, default: true })
  cashOnDelivery: boolean;

  @Prop({ required: true, default: true })
  emailNotifications: boolean;

  @Prop({ required: true, default: true })
  orderConfirmations: boolean;

  @Prop({ required: true, default: true })
  lowStockAlerts: boolean;

  @Prop({ required: true, default: true })
  newUserRegistrations: boolean;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings); 