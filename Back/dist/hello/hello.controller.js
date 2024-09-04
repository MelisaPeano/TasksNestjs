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
exports.HelloController = void 0;
const common_1 = require("@nestjs/common");
const validateuser_pipe_1 = require("./pipes/validateuser/validateuser.pipe");
const auth_guard_1 = require("./guards/auth/auth.guard");
let HelloController = class HelloController {
    getNumber(num) {
        console.log(typeof num);
        return num + 13;
    }
    isUserActive(status) {
        return status;
    }
    greet(query) {
        return `Hello ${query.name}! You are ${query.age} years old`;
    }
};
exports.HelloController = HelloController;
__decorate([
    (0, common_1.Get)('tiket/:num'),
    __param(0, (0, common_1.Param)('num', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelloController.prototype, "getNumber", null);
__decorate([
    (0, common_1.Get)('active/:status'),
    __param(0, (0, common_1.Param)('status', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], HelloController.prototype, "isUserActive", null);
__decorate([
    (0, common_1.Get)('greet'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)(validateuser_pipe_1.ValidateuserPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HelloController.prototype, "greet", null);
exports.HelloController = HelloController = __decorate([
    (0, common_1.Controller)()
], HelloController);
//# sourceMappingURL=hello.controller.js.map