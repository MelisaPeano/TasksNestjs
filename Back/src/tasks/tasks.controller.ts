import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
  @Post()
  createTasks() {
    this.tasksService.createTasks();
  }
  @Put()
  updateTasks() {
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
