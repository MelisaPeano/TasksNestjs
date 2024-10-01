import { CreateTasksDto } from "./dto/createTasks.dto";
import { PrismaService } from "../prisma.service";
import { Task } from "@prisma/client";
import { updateTasksDto } from "./dto/updateTasks.dto";
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    getTasks(): Promise<Task[]>;
    getTask(id: number): Promise<Task | null>;
    getTasksByUser(userId: string): Promise<Task[]>;
    createTask(data: CreateTasksDto): Promise<Task>;
    updateTask(id: number, data: updateTasksDto): Promise<Task>;
    updateStatusTask(id: number): Promise<Task>;
    deleteTask(id: number): Promise<Task>;
}
