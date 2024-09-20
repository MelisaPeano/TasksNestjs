import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "../users/dto/UserDto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async signIn(email: string, pass: string): Promise<AuthResponse> {
    console.log("Received username auth service :", email);

    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
  async findOrCreateUser(user: any) {
    let existingUser = await this.usersService.findOne(user.username);
    if (!existingUser) {
      existingUser = await this.usersService.createOneUsers(user);
    }
    return existingUser;
  }
}
