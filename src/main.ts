import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as hbs from "hbs";
import { TimerInterceptor } from "./timer.interceptor";
import { AuthInterceptor } from "./auth.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TimerInterceptor(), new AuthInterceptor());

  app.setViewEngine("hbs");
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.set("view options", { layout: "layouts/layout" });

  hbs.registerPartials(join(__dirname, "..", "views/partials"));
  hbs.registerPartials(join(__dirname, "..", "views/pages"));


  const configService = app.get(ConfigService);
  const port = configService.get("PORT") || 3000;
  await app.listen(port);
}

bootstrap();
