import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { CreateTasksDto } from "./dto/createTasks.dto";
import { HttpException, NotFoundException } from "@nestjs/common";

describe("TasksController", () => {
  let controller: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn((title, description) => {
              const task = {
                id: 1,
                title: title,
                description: description,
                status: true,
                isCompleted: true,
                createdAt: new Date(),
              };
              return task;
            }),
            updateTasks: jest.fn(),
            deleteTask: jest.fn(),
            getTasks: jest.fn(),
            getTask: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it("should be defined", () => {
    expect(tasksService).toBeDefined();
  });
  it("should be create a new task", async () => {
    const tasksMock = {
      title: "test",
      description: "test",
      userId: "jssjdjf",
    };
    const result = {
      id: 1,
      status: true,
      isCompleted: true,
      createdAt: new Date(),
      title: "test",
      description: "test",
      userId: "jdjdjf",
    };
    jest.spyOn(tasksService, "createTask").mockResolvedValue(result);
    expect(await controller.createTasks(tasksMock)).toEqual({
      statusCode: 201,
      message: "task created successefuly",
      data: {
        title: result.title,
        description: result.description,
        id: result.id,
      },
    });
  });
  it("should throw a BadRequestException if task creation fails", async () => {
    const createTaskDto: CreateTasksDto = {
      title: "Test Task",
      description: "Test Description",
      userId: "jdjdjf",
    };

    jest.spyOn(tasksService, "createTask").mockRejectedValue(new Error());

    await expect(controller.createTasks(createTaskDto)).rejects.toThrowError(
      new HttpException(
        { statusCode: 400, message: "Invalid task data," },
        400,
      ),
    );
  });
  describe("get all tasks", () => {
    it("should return an array of tasks", async () => {
      const result = [
        {
          id: 1,
          status: true,
          isCompleted: true,
          createdAt: new Date(),
          title: "test",
          description: "test",
          userId: "jdjddjf",
        },
        {
          id: 2,
          status: true,
          isCompleted: true,
          createdAt: new Date(),
          title: "test2",
          description: "test2",
          userId: "jdjdjf",
        },
      ];
      jest.spyOn(tasksService, "getTasks").mockResolvedValue(result);
      expect(await controller.getAllTasks()).toEqual({
        data: result,
        statusCode: 200,
        message: "Tasks retrieved successfully",
      });
    });
    it("should throw a NotFoundException if no tasks are found", async () => {
      jest.spyOn(tasksService, "getTasks").mockResolvedValue([]);
      await expect(controller.getAllTasks()).rejects.toThrow(
        new NotFoundException("no tasks found"),
      );
    });
  });
  describe("getTask", () => {
    it("should return a task by ID", async () => {
      const result = {
        id: 1,
        status: true,
        isCompleted: true,
        createdAt: new Date(),
        title: "test",
        description: "test",
        userId: "jdjdjf",
      };
      jest.spyOn(tasksService, "getTask").mockResolvedValue(result);
      expect(await controller.getTask("1")).toEqual({
        data: result,
        statusCode: 200,
        message: "Task retrieved successfully",
      });
    });
    it("should throw a NotFoundException if task is not found", async () => {
      jest.spyOn(tasksService, "getTask").mockResolvedValue(undefined);
      await expect(controller.getTask("efef")).rejects.toThrow(
        new NotFoundException(`task whit efef not found`),
      );
    });
  });
  describe("deleteTasks", () => {
    it("should delete a task by ID", async () => {
      const result = {
        id: 1,
        status: true,
        isCompleted: true,
        createdAt: new Date(),
        title: "test",
        description: "test",
        userId: "jdjdjf",
      };
      jest.spyOn(tasksService, "deleteTask").mockResolvedValue(result);
      expect(await controller.deleteTasks("1")).toEqual({
        statusCode: 200,
        message: "Task deleted successfully",
      });
    });
  });
});
