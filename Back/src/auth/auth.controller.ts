import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guards";
import { LoginUserDto } from "../users/dto/loginUser.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStrategy } from "./local.strategy";
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private localJWT: LocalStrategy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  signIn(@Body() signInDto: LoginUserDto) {
    console.log("Received username auth controller :", signInDto.username);
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
