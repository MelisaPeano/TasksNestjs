import { TasksService } from './tasks.service';
export declare class TasksController {
    tasksService: TasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): string;
    createTasks(): void;
    updateTasks(): void;
    updateStatusTasks(): void;
    deleteTasks(): string;
}
