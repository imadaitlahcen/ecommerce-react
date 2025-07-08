import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminSettingsService } from './admin-settings.service';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    UsersModule, 
    OrdersModule, 
    ProductsModule,
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema }
    ])
  ],
  controllers: [
    AdminDashboardController,
    AdminUsersController,
    AdminOrdersController,
    AdminProductsController,
    AdminSettingsController,
  ],
  providers: [AdminSettingsService],
})
export class AdminModule {} 