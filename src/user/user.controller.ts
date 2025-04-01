import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Post('create')
//   createUser(@Body() userCreateDto: UserCreateDto) {
 //    const user = this.userService.create(userCreateDto);
 //    return user;
//  }
}
