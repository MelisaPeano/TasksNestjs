import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserNotFoundException } from "./exeptions/userNotFound.exception";

@Controller("users")
@ApiTags("users") // Anotacion para Swagger, lo aplico a todo el controlador users
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Get all users" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    if (!users || users.length === 0) {
      throw new UserNotFoundException();
    }
    return users;
  }
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad Request: Invalid input" })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) //acepta solo datos del dto
  @Post("/create")
  async createUsers(@Body() user: CreateUserDto) {
    try {
      return this.usersService.createOneUsers(user);
    } catch (error) {
      throw new BadRequestException("Invalid user data", error.message);
    }
  }
}
