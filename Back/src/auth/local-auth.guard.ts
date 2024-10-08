import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: any) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
  handleRequest(err, user, info, context) {
    const req = context.switchToHttp().getRequest();
    req.session = null;
    return super.handleRequest(err, user, info, context);
  }
}
