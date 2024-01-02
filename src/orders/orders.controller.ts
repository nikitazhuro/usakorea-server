import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders(@Res({ passthrough: true }) response: Response) {
    return this.ordersService.getAll();
  }

  @Post('create')
  createOrder(@Body() createConfig) {
    return this.ordersService.createOrder(createConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateOrder(@Body() createConfig) {
    return this.ordersService.updateOrder(createConfig);
  }
}
