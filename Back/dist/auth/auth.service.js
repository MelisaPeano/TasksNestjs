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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async signIn(email, password) {
        console.log("Received username auth service :", email);
        try {
            const user = await this.usersService.findOne(email);
            if (user?.password === password) {
                const payload = { sub: user.id, username: user.username };
                const access_token = await this.jwtService.signAsync(payload);
                return {
                    access_token,
                    user,
                };
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid credentials", error.message);
        }
    }
    async findOrCreateUser(user) {
        let existingUser = await this.usersService.findOne(user.username);
        if (!existingUser) {
            existingUser = await this.usersService.createOneUsers(user);
        }
        return existingUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map