import { CreateUserDto } from "./dto/createUser.dto";
import { PrismaService } from "../prisma.service";
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
        username: string;
    }[]>;
    createOneUsers(users: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(email: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        password: string;
        createdAt: Date;
        updateaT: Date;
        username: string;
    }>;
}
