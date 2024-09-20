declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    canActivate(context: any): Promise<boolean>;
    handleRequest(err: any, user: any, info: any, context: any): any;
}
export {};
