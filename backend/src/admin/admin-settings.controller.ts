import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AdminSettingsService } from './admin-settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Get()
  async getSettings() {
    return this.adminSettingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() settingsData: any) {
    return this.adminSettingsService.updateSettings(settingsData);
  }
} 