import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { DeliveredCarsService } from './delivered-cars.service';

@Controller('delivered-cars')
export class DeliveredCarsController {
  constructor(private readonly deliveredCarsService: DeliveredCarsService) {}

  @Get()
  getAll() {
    return this.deliveredCarsService.getAll();
  }

  @Get('shown')
  getAllFowShow() {
    return this.deliveredCarsService.getAllFowShow();
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@UploadedFile() image: any) {
    return this.deliveredCarsService.create(image);
  }

  @Post('update')
  update(@Body() body: any) {
    return this.deliveredCarsService.update(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deliveredCarsService.delete(+id);
  }
}
