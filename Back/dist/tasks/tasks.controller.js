"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const createTasks_dto_1 = require("./dto/createTasks.dto");
const updateTasks_dto_1 = require("./dto/updateTasks.dto");
const swagger_1 = require("@nestjs/swagger");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async getAllTasks() {
        const tasks = await this.tasksService.getTasks();
        if (!tasks || tasks.length === 0) {
            throw new common_1.NotFoundException("no tasks found");
        }
        return {
            data: tasks,
            statusCode: common_1.HttpStatus.OK,
            message: "Tasks retrieved successfully",
        };
    }
    async getTask(id) {
        try {
            const task = await this.tasksService.getTask(parseInt(id));
            if (!task) {
                throw new common_1.NotFoundException(`task whit ${id} not found`);
            }
            else {
                return {
                    data: task,
                    statusCode: common_1.HttpStatus.OK,
                    message: "Task retrieved successfully",
                };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException(`task whit ${id} not found`);
        }
    }
    async createTasks(tasks) {
        try {
            const createdTask = await this.tasksService.createTask(tasks);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: "task created successefuly",
                data: {
                    title: createdTask.title,
                    description: createdTask.description,
                    id: createdTask.id,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: "Invalid task data," }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateTasks(id, tasks) {
        const updatedTask = await this.tasksService.updateTask(parseInt(id), tasks);
        if (!updatedTask) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Task updated successfully",
            data: {
                title: updatedTask.title,
                description: updatedTask.description,
                id: updatedTask.id,
            },
        };
    }
    async updateStatusTasks(id) {
        const updatedTask = await this.tasksService.updateStatusTask(parseInt(id));
        if (!updatedTask) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Task status updated successfully",
            data: updatedTask,
        };
    }
    async deleteTasks(id) {
        try {
            const deletedTask = await this.tasksService.deleteTask(parseInt(id));
            if (!deletedTask) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
            if (deletedTask) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: "Task deleted successfully",
                };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all tasks" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Get all tasks" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "not tasks found" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get a task by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Task found successfully" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Task not found" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("/:id"),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create a new task" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "tasks created" }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Invalid task data" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)("/create"),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTasks_dto_1.CreateTasksDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update a task by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Task updated successfully" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Task not found" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)("/:id"),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateTasks_dto_1.updateTasksDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update task status by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Task status updated successfully" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Task not found" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)("/:id"),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatusTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete a task by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Task deleted successfully" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Task not found" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)("delete/:id"),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTasks", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)("/tasks"),
    (0, swagger_1.ApiTags)("tasks"),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map