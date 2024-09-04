import { CreateTasksDto } from './dto/createTasks.dto';
export declare class TasksService {
    private tasks;
    getTasks(): any[];
    getTask(id: number): any;
    createTasks(tasks: CreateTasksDto): CreateTasksDto;
    updateTasks(): string;
    updateStatusTasks(): string;
    deleteTasks(): string;
}
