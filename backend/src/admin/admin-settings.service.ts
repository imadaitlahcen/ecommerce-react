import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';

@Injectable()
export class AdminSettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<Settings>,
  ) {}

  async getSettings(): Promise<Settings> {
    let settings = await this.settingsModel.findOne().exec();
    
    if (!settings) {
      // Créer des paramètres par défaut si aucun n'existe
      settings = await this.settingsModel.create({
        storeName: 'TechStore',
        storeDescription: 'Your one-stop shop for all things tech',
        contactEmail: 'contact@techstore.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Tech Street, Silicon Valley, CA 94025',
        website: 'https://techstore.com',
        currency: 'USD',
        taxRate: 8.5,
        stripeEnabled: false,
        paypalEnabled: false,
        cashOnDelivery: true,
        emailNotifications: true,
        orderConfirmations: true,
        lowStockAlerts: true,
        newUserRegistrations: true,
      });
    }
    
    return settings;
  }

  async updateSettings(settingsData: Partial<Settings>): Promise<Settings> {
    let settings = await this.settingsModel.findOne().exec();
    
    if (settings) {
      // Mettre à jour les paramètres existants
      Object.assign(settings, settingsData);
      return await settings.save();
    } else {
      // Créer de nouveaux paramètres
      return await this.settingsModel.create(settingsData);
    }
  }
} 