import { Controller, Get, Post, Put, Patch, Delete, Body, Param} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/createTasks.dto';
import { updateTasksDto } from './dto/updateTasks.dto';

@Controller('/tasks')
export class TasksController {
  tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }
  @Get()
  getAllTasks() {
    return this.tasksService.getTasks();
  }
  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(parseInt(id));
  }
  @Post()
  createTasks(@Body()tasks: CreateTasksDto) {
    this.tasksService.createTasks(tasks);
  }
  @Put('/:id')
  updateTasks(@Body()tasks: updateTasksDto) {
    this.tasksService.updateTasks();
  }
  @Patch()
  updateStatusTasks() {
    this.tasksService.updateStatusTasks();
  }
  @Delete()
  deleteTasks() {
    return this.tasksService.deleteTasks();
  }
}
