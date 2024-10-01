import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  HttpException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTasksDto } from "./dto/createTasks.dto";
import { updateTasksDto } from "./dto/updateTasks.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
@Controller("/tasks")
@ApiTags("tasks")
export class TasksController {
  tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: 200, description: "Get all tasks" })
  @ApiResponse({ status: 400, description: "not tasks found" })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllTasks() {
    const tasks = await this.tasksService.getTasks();
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException("no tasks found");
    }
    return {
      data: tasks,
      statusCode: HttpStatus.OK,
      message: "Tasks retrieved successfully",
    };
  }
  @ApiOperation({ summary: "Get a task user" })
  @ApiResponse({ status: 200, description: "Task user found successfully" })
  @ApiNotFoundResponse({ description: "Task user not found" })
  @HttpCode(HttpStatus.OK)
  @Get("/get/:id")
  async getTaskUser(@Param("id") id: string) {
    try {
      const task = await this.tasksService.getTasksByUser(id);
      if (!task) {
        throw new NotFoundException(`task whit ${id} not found`);
      } else {
        return {
          data: task,
          statusCode: HttpStatus.OK,
          message: "Task retrieved successfully",
        };
      }
    } catch (error) {
      throw new NotFoundException(`task whit ${id} not found`);
    }
  }
  @ApiOperation({ summary: "Get a task by ID" })
  @ApiResponse({ status: 200, description: "Task found successfully" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @HttpCode(HttpStatus.OK)
  @Get("/:id")
  async getTask(@Param("id") id: string) {
    try {
      const task = await this.tasksService.getTask(parseInt(id));
      if (!task) {
        throw new NotFoundException(`task whit ${id} not found`);
      } else {
        return {
          data: task,
          statusCode: HttpStatus.OK,
          message: "Task retrieved successfully",
        };
      }
    } catch (error) {
      throw new NotFoundException(`task whit ${id} not found`);
    }
  }
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({ status: 201, description: "tasks created" })
  @ApiBadRequestResponse({ description: "Invalid task data" })
  @HttpCode(HttpStatus.CREATED)
  @Post("/create")
  async createTasks(@Body() tasks: CreateTasksDto) {
    try {
      const createdTask = await this.tasksService.createTask(tasks);
      return {
        statusCode: HttpStatus.CREATED,
        message: "task created successefuly",
        data: {
          title: createdTask.title,
          description: createdTask.description,
          id: createdTask.id,
          status: createdTask.isCompleted,
          userId: createdTask.userId,
        },
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: "Invalid task data," },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @ApiOperation({ summary: "Update a task by ID" })
  @ApiResponse({ status: 200, description: "Task updated successfully" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @HttpCode(HttpStatus.OK)
  @Put("/:id")
  async updateTasks(@Param("id") id: string, @Body() tasks: updateTasksDto) {
    const updatedTask = await this.tasksService.updateTask(parseInt(id), tasks);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Task updated successfully",
      data: {
        title: updatedTask.title,
        description: updatedTask.description,
        id: updatedTask.id,
      },
    };
  }
  @ApiOperation({ summary: "Update task status by ID" })
  @ApiResponse({ status: 200, description: "Task status updated successfully" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @HttpCode(HttpStatus.OK)
  @Patch("/:id")
  async updateStatusTasks(@Param("id") id: string) {
    const updatedTask = await this.tasksService.updateStatusTask(parseInt(id));
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Task status updated successfully",
      data: updatedTask,
    };
  }
  @ApiOperation({ summary: "Delete a task by ID" })
  @ApiResponse({ status: 200, description: "Task deleted successfully" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @HttpCode(HttpStatus.OK)
  @Delete("delete/:id")
  async deleteTasks(@Param("id") id: string) {
    try {
      const deletedTask = await this.tasksService.deleteTask(parseInt(id));
      if (!deletedTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      if (deletedTask) {
        return {
          statusCode: HttpStatus.OK,
          message: "Task deleted successfully",
        };
      }
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
