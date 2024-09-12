import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }[]>;
    createUsers(user: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }>;
    findOne(username: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }>;
}
