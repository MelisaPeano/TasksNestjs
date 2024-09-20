import { HttpStatus } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTasksDto } from "./dto/createTasks.dto";
import { updateTasksDto } from "./dto/updateTasks.dto";
export declare class TasksController {
    tasksService: TasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Promise<{
        data: {
            id: number;
            title: string;
            description: string | null;
            status: boolean;
            isCompleted: boolean;
            createdAt: Date;
        }[];
        statusCode: HttpStatus;
        message: string;
    }>;
    getTask(id: string): Promise<{
        data: Promise<{
            id: number;
            title: string;
            description: string | null;
            status: boolean;
            isCompleted: boolean;
            createdAt: Date;
        }>;
        statusCode: HttpStatus;
        message: string;
    }>;
    createTasks(tasks: CreateTasksDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            title: string;
            description: string;
            id: number;
        };
    }>;
    updateTasks(id: string, tasks: updateTasksDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            title: string;
            description: string;
            id: number;
        };
    }>;
    updateStatusTasks(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            title: string;
            description: string | null;
            status: boolean;
            isCompleted: boolean;
            createdAt: Date;
        };
    }>;
    deleteTasks(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
