import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "../users/dto/UserDto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    signIn(email: string, password: string): Promise<AuthResponse>;
    findOrCreateUser(user: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }>;
}
