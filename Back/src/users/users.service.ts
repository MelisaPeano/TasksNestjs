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
  async findOne(email: string) {
    console.log("Received username en users service:", email);
    try {
      if (!email) {
        throw new Error("Username is required");
      }
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      console.log("user", user);
      if (!user) {
        throw new NotFoundException(`User with username ${email} not found`);
      }
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw new Error("An error occurred while fetching the user.");
    }
  }
}
