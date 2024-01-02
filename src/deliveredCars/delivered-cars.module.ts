import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DeliveredCarsModel } from './delivered-cars.model';
import { DeliveredCarsService } from './delivered-cars.service';
import { DeliveredCarsController } from './delivered-cars.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([DeliveredCarsModel]), FileModule],
  controllers: [DeliveredCarsController],
  providers: [DeliveredCarsService],
})
export class DeliveredCarsModule {}
