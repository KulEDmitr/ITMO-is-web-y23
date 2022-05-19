import { Injectable, NestMiddleware } from '@nestjs/common';
import { Res, Req } from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Injectable()
export class RenderMiddleware implements NestMiddleware {
  async use(@Req() req, @Res() res, next: () => void) {
    res.is_auth = false;
    res.login = undefined;
    if (req.session !== undefined) {
      const userId = req.session.getUserId();
      const userInfo = await EmailPassword.getUserById(userId);
      if (userInfo !== undefined) {
        res.is_auth = true;
        res.login = userInfo.email;
      }
    }
    next();
  }
}

