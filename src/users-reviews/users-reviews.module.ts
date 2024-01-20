import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersReviewsController } from './users-reviews.controller';
import { UsersReviewsService } from './users-reviews.service';
import { UsersReviewsModel } from './users-reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([UsersReviewsModel])],
  controllers: [UsersReviewsController],
  providers: [UsersReviewsService],
})
export class UsersReviewsModule {}
