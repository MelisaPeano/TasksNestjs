import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        Tasks: true,
      },
    });
    return users;
  }
  async createOneUsers(users: CreateUserDto) {
    try {
      const create = await this.prisma.user.create({
        data: users,
        include: {
          Tasks: true,
        },
      });
      return {
        id: create.id,
        email: create.email,
        name: create.name,
        password: create.password,
        createdAt: create.createdAt,
        updateaT: create.updateaT,
        username: create.username,
        Tasks: create.Tasks,
      };
    } catch (error) {
      throw new BadRequestException("Invalid user data", error.message);
    }
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
        include: {
          Tasks: true,
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
