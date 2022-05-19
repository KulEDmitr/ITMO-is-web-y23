import { Injectable } from '@nestjs/common';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session/faunadb';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Injectable()
export class AppService {
  async getSession(@Session() session: SessionContainer) {
    let is_auth = false;
    let login = undefined;
    if (session !== undefined) {
      const userId = session.getUserId();
      const userInfo = await EmailPassword.getUserById(userId);
      if (userInfo !== undefined) {
        is_auth = true;
        login = userInfo.email;
      }
    }
    is_auth = true;
    login = 'lalala';
    return { is_auth: is_auth, login: login };
  }
}
