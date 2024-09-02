import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return 'obteniendo todas las tareas';
  }
  createTasks() {
    return 'crear tarea';
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
