import { Body, Controller, Get, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Post()
  createUsers(@Body() user: CreateUserDto) {
    return this.usersService.createOneUsers(user);
  }
}
