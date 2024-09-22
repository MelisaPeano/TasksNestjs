import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "../users/dto/UserDto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async signIn(email: string, password: string): Promise<AuthResponse> {
    console.log("Received username auth service :", email);
    try {
      const user = await this.usersService.findOne(email);
      if (user?.password === password) {
        const payload = { sub: user.id, username: user.username };
        const access_token: string = await this.jwtService.signAsync(payload);
        return {
          access_token,
          user,
        };
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials", error.message);
    }
  }
  async findOrCreateUser(user: any) {
    let existingUser = await this.usersService.findOne(user.username);
    if (!existingUser) {
      existingUser = await this.usersService.createOneUsers(user);
    }
    return existingUser;
  }
}
