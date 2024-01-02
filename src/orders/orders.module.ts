import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModel } from './orders.model';

@Module({
  imports: [SequelizeModule.forFeature([OrdersModel])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
