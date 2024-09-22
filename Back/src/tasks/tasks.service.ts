import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTasksDto } from "./dto/createTasks.dto";
import { PrismaService } from "../prisma.service";
import { Task } from "@prisma/client";
import { updateTasksDto } from "./dto/updateTasks.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {} // Busco todas las tareas, el constructor recibe el prismaService
  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTask(id: number): Promise<Task | null> {
    // Busco una tarea por id
    const task = this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return undefined;
    }
    return task;
  }
  async createTask(data: CreateTasksDto): Promise<Task> {
    // Creo una nueva tarea basandome en mi dto
    return this.prisma.task.create({
      data,
    });
  }
  async updateTask(id: number, data: updateTasksDto): Promise<Task> {
    const task = this.prisma.task.update({
      where: { id },
      data,
    });
    if (!task) {
      throw new NotFoundException(`Task no encontrada`);
    }
    return task;
  }
  async updateStatusTask(id: number): Promise<Task> {
    const task = this.prisma.task.update({
      where: { id },
      data: {
        status: false,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task no encontrada`);
    }
    return task;
  }
  async deleteTask(id: number): Promise<Task> {
    try {
      const task = await this.prisma.task.delete({
        where: { id },
      });
      if (!task) {
        return undefined;
      }
      return task;
    } catch (error) {
      throw new NotFoundException(`task whit ${id} not found`);
    }
  }
}
