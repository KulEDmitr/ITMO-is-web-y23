import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'hbs';
import { TimerInterceptor } from './timer.interceptor';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { RenderInterceptor } from './auth/render.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [new ConfigService().get('APP_DOMAIN')],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.set('view options', { layout: 'layouts/layout' });

  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/pages'));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.useGlobalInterceptors(new TimerInterceptor(), new RenderInterceptor());

  app.useGlobalPipes(new ValidationPipe({
      transform: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new SupertokensExceptionFilter()
  );

  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('The nook-of-madness project API description')
    .setVersion('0.0.1')
    .addCookieAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
    ) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(port);
}

bootstrap();
