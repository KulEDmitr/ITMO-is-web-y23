import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';

import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  providers: [SupertokensService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
      ],
      module: AuthModule,
    };
  }
}
