import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  getUsers() {
    return this.prisma.user.findMany(); // busco todos los users en la base de datos
  }
  createOneUsers(users: CreateUserDto) {
    return this.prisma.user.create({ data: users }); // creo un nuevo user
  }
}
