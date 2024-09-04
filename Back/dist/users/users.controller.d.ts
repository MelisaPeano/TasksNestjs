import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
    }[]>;
    createUsers(user: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
