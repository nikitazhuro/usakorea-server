import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcryptjs';

import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { UserService } from 'src/user/user.service';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: UserCreateDto) {
    const user = await this.userService.getUserByEmail(userDto);

    if (isEmpty(user)) {
      throw new HttpException(
        'Данного юзера не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkPath = await bcrypt.compare(userDto.password, user.password);

    if (checkPath) {
      return this.generateToken(user);
    }

    throw new HttpException('Check your password', HttpStatus.BAD_REQUEST);
  }

  async registration(userDto: UserCreateDto) {
    const user = await this.userService.getUserByEmail(userDto);

    if (!isEmpty(user)) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(userDto.password, 5);

    const newUser = await this.userService.create({
      ...userDto,
      password: hashPass,
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: UserModel) {
    const payload = {
      uuid: user.uuid,
      login: user.login,
    };

    return this.jwtService.sign(payload);
  }
}
