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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTasks() {
        return this.prisma.task.findMany();
    }
    async getTask(id) {
        const task = this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return undefined;
        }
        return task;
    }
    async getTasksByUser(userId) {
        const tasksUser = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { Tasks: true },
        });
        if (!tasksUser) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return tasksUser.Tasks;
    }
    async createTask(data) {
        return this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: data.userId },
            });
            if (!user) {
                throw new common_1.BadRequestException("User not found");
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
    async updateTask(id, data) {
        const task = this.prisma.task.update({
            where: { id },
            data,
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task no encontrada`);
        }
        return task;
    }
    async updateStatusTask(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task con ID ${id} no encontrada`);
        }
        const updatedTask = this.prisma.task.update({
            where: { id },
            data: {
                status: !task.status,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task no encontrada`);
        }
        return updatedTask;
    }
    async deleteTask(id) {
        try {
            const task = await this.prisma.task.delete({
                where: { id },
            });
            if (!task) {
                return undefined;
            }
            return task;
        }
        catch (error) {
            throw new common_1.NotFoundException(`task whit ${id} not found`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map