import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: UserCreateDto) {
    return this.authService.login(userDto);
  }

   //@Post('registration')
 //  registration(@Body() userDto: UserCreateDto) {
 //    return this.authService.registration(userDto);
 //  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  authCheck(@Res({ passthrough: true }) response: Response) {
    return true;
  }
}
