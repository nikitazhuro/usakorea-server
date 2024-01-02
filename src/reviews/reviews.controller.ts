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

import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('last-five')
  getLastFive() {
    return this.reviewsService.getLastFive();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders(@Res({ passthrough: true }) response: Response) {
    return this.reviewsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createReview(@Body() createConfig) {
    return this.reviewsService.createReview(createConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateReview(@Body() createConfig) {
    return this.reviewsService.updateReview(createConfig);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReview(+id);
  }
}
