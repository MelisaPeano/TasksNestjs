import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
