import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth-jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
