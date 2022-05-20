import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { map } from 'rxjs/operators';
import { UserController } from '../prisma/users/user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../prisma/users/user.service';

@Injectable()
export class RenderInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    let is_auth = false;
    let login = undefined;
    if (req.session !== undefined) {
      const userId = req.session.getUserId();
      const userInfo = await EmailPassword.getUserById(userId);

      console.log(userInfo);
      if (userInfo !== undefined) {
        const user = await new UserController(
          new UserService(new PrismaService()),
        ).getUserBySuperTokensId(userInfo.id);
        
        is_auth = true;
        login = user.login;
      }
    }

    return next.handle().pipe(
      map((data) => ({
        ...data,
        is_auth: is_auth,
        login: login,
      })),
    );
  }
}
