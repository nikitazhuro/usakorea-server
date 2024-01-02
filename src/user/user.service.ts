import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { UserCreateDto } from './dto/user-create.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserModel> {
    const newUserData = {
      uuid: v4(),
      ...userCreateDto,
    };
    const newUser = await this.userRepository.create(newUserData);

    return newUser;
  }

  async getUserByEmail(userDto: UserCreateDto) {
    const user = this.userRepository.findOne({
      where: {
        login: userDto.login,
      },
      include: {
        all: true,
      },
    });
    return user;
  }
}
