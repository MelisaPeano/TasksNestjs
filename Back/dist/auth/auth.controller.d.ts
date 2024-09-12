import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/loginUser.dto";
import { LocalStrategy } from "./local.strategy";
export declare class AuthController {
    private authService;
    private localJWT;
    constructor(authService: AuthService, localJWT: LocalStrategy);
    signIn(signInDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
