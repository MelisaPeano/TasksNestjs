import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  getUsers() {
    return this.prisma.user.findMany(); // busco todos los users en la base de datos
  }
  createOneUsers(users: CreateUserDto) {
    return this.prisma.user.create({ data: users }); // creo un nuevo user
  }
  async findOne(username: string) {
    console.log("Received username en users service:", username);

    if (!username) {
      throw new Error("Username is required");
    }
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }
}
