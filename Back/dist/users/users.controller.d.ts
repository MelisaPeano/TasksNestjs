import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<({
        Tasks: {
            id: number;
            title: string;
            description: string | null;
            status: boolean;
            isCompleted: boolean;
            createdAt: Date;
            userId: string;
        }[];
    } & {
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    })[]>;
    createUsers(user: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
        Tasks: {
            id: number;
            title: string;
            description: string | null;
            status: boolean;
            isCompleted: boolean;
            createdAt: Date;
            userId: string;
        }[];
    }>;
}
