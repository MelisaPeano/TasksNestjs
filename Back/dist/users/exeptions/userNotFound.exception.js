"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class UserNotFoundException extends common_1.NotFoundException {
    constructor() {
        super("User not found");
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=userNotFound.exception.js.map