import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { map } from 'rxjs/operators';

@Injectable()
export class RenderInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    let is_auth = false;
    let email = undefined;
    if (req.session !== undefined) {
      const userId = req.session.getUserId();
      const userInfo = await EmailPassword.getUserById(userId);
      console.log(userInfo);
      if (userInfo !== undefined) {
        is_auth = true;
        email = userInfo.email;
      }
    }

    return next.handle().pipe(
      map((data) => ({
        ...data,
        is_auth: is_auth,
        login: email,
      })),
    );
  }
}
