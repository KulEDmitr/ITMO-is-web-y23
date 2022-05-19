import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { middleware } from 'supertokens-node/framework/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokensMiddleware: any;

  constructor() {
    this.supertokensMiddleware = middleware();
  }

  use(@Req() req, @Res() res, next: () => void) {
    return this.supertokensMiddleware(req, res, next);
  }
}