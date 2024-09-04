import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreateTasksDto } from './dto/createTasks.dto';


@Injectable()
export class TasksService {
  private tasks = [];
  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    const foundTasks = this.tasks.find((tasks) => tasks.id === id);
    const result = foundTasks ? foundTasks : new NotFoundException('tarea no encontrada');
    return result;
  }
  createTasks(tasks: CreateTasksDto) {
    console.log(tasks);
    this.tasks.push({
      ...tasks,
      id: this.tasks.length + 1,
    });
    return tasks;
  }
  updateTasks() {
    return 'actualizar tarea';
  }
  updateStatusTasks() {
    return 'actualizar tarea';
  }
  deleteTasks() {
    return 'borrar tarea';
  }
}
