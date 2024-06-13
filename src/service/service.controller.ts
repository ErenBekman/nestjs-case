import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.entity';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Post()
  async create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.serviceService.create(serviceData);
  }
}
