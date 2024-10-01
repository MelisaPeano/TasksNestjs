import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
  async getTasksByUser(userId: string): Promise<Task[]> {
    const tasksUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Tasks: true },
    });
    if (!tasksUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return tasksUser.Tasks;
  }
  async createTask(data: CreateTasksDto): Promise<Task> {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }
      const task = await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          userId: data.userId,
        },
      });

      return task;
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
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task con ID ${id} no encontrada`);
    }
    const updatedTask = this.prisma.task.update({
      where: { id },
      data: {
        status: !task.status,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task no encontrada`);
    }
    return updatedTask;
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
