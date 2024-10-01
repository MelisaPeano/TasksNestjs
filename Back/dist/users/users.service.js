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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers() {
        const users = await this.prisma.user.findMany({
            include: {
                Tasks: true,
            },
        });
        return users;
    }
    async createOneUsers(users) {
        try {
            const create = await this.prisma.user.create({
                data: users,
                include: {
                    Tasks: true,
                },
            });
            return {
                id: create.id,
                email: create.email,
                name: create.name,
                password: create.password,
                createdAt: create.createdAt,
                updateaT: create.updateaT,
                username: create.username,
                Tasks: create.Tasks,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException("Invalid user data", error.message);
        }
    }
    async findOne(email) {
        console.log("Received username en users service:", email);
        try {
            if (!email) {
                throw new Error("Username is required");
            }
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    Tasks: true,
                },
            });
            console.log("user", user);
            if (!user) {
                throw new common_1.NotFoundException(`User with username ${email} not found`);
            }
            return user;
        }
        catch (error) {
            console.error("Error finding user:", error);
            throw new Error("An error occurred while fetching the user.");
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map