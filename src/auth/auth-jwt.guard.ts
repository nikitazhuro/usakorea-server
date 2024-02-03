import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { sendErrorToSentry } from 'src/utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const autorization = req.headers?.authorization?.split(' ');

      const bearer = autorization[0];
      const token = autorization[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          'В авторизации отказано',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return true;
    } catch (error) {
      console.log(error);
      sendErrorToSentry('auth error', error?.message);

      throw new HttpException(
        'В авторизации отказано',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
