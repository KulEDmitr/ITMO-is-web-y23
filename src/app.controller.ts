import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { TimerInterceptor } from "./timer.interceptor";

@Controller()
export class AppController {

  @Get()
  @Render("pages/index1")
  root() {
    return {};
  }

  @Get("different")
  @Render("pages/different")
  different() {
    return {};
  }

  @Get("form")
  @Render("pages/form")
  form() {
    return {
      add_styles : '<link rel="stylesheet" href ="css/form.css">'
    };
  }

  @Get("gallery")
  @Render("pages/gallery")
  gallery() {
    return {
      add_styles: '<!-- swiper -->' +
        '<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>' +
        '<link rel="stylesheet" href ="/css/gallery.css">'
    };
  }

  @Get("loaded_pictures")
  @Render("pages/loaded_pictures")
  loaded_pictures() {
    return {
      add_styles: '<link rel="stylesheet" href ="/css/loaded.css">'
    };
  }

  @Get("operation")
  @Render("pages/operation")
  operation() {
    return {};
  }

  @Get("physics")
  @Render("pages/physics")
  physics() {
    return {};
  }
}
