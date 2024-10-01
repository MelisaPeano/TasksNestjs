import { CreateUserDto } from "./dto/createUser.dto";
import { PrismaService } from "../prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
    createOneUsers(users: CreateUserDto): Promise<{
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
    findOne(email: string): Promise<{
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
    }>;
}
