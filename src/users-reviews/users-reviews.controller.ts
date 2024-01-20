import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersReviewsService } from './users-reviews.service';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';

@Controller('users-reviews')
export class UsersReviewsController {
  constructor(private readonly usersReviewsService: UsersReviewsService) {}

  @Get('last-five')
  getLastFive() {
    return this.usersReviewsService.getLastFive();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders(@Res({ passthrough: true }) response: Response) {
    return this.usersReviewsService.getAll();
  }

  @Post('create')
  createReview(@Body() createConfig) {
    return this.usersReviewsService.createReview(createConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateReview(@Body() createConfig) {
    return this.usersReviewsService.updateReview(createConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.usersReviewsService.deleteReview(+id);
  }
}
