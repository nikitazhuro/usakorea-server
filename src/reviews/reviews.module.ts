import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsModel } from './reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([ReviewsModel])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
