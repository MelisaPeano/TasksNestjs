import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/loginUser.dto";
import { LocalStrategy } from "./local.strategy";
export declare class AuthController {
    private readonly authService;
    private localJWT;
    constructor(authService: AuthService, localJWT: LocalStrategy);
    signIn(signInDto: LoginUserDto): Promise<import("../users/dto/UserDto").AuthResponse>;
    getProfile(req: any): any;
}
