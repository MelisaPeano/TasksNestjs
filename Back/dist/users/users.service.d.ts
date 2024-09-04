import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
    }[]>;
    createOneUsers(users: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
