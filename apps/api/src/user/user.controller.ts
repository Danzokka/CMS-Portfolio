import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/UserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    try {
      return this.userService.createUser(userDto);
    }
    catch (error) {
      throw error;
    }
  }
}
