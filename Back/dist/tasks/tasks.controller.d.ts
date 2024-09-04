import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/createTasks.dto';
import { updateTasksDto } from './dto/updateTasks.dto';
export declare class TasksController {
    tasksService: TasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): any[];
    getTask(id: string): any;
    createTasks(tasks: CreateTasksDto): void;
    updateTasks(tasks: updateTasksDto): void;
    updateStatusTasks(): void;
    deleteTasks(): string;
}
