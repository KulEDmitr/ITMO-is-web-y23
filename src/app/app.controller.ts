import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  // @Get()
  // @Render('pages/index1')
  // root() {
  //   return {};
  // }

  @Get('auth')
  @Render('pages/loginForm')
  loginForm() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @Get('blog')
  @Render('pages/blog')
  blog() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="css/blog.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  // @Get('blog')
  // @Render('pages/blog')
  // blog() {
  //   return {
  //     add_styles:
  //       '<link rel="stylesheet" href ="css/form.css">' +
  //       '<link rel="stylesheet" href ="css/job_card.css">',
  //   };
  // }

  @Get('jobs/id/:id')
  @Render('pages/edit_job_card')
  job_card() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('jobs-list')
  @Render('pages/jobs')
  async getJobs() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/grid.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @Get('create-job')
  @Render('pages/create_job_card')
  async createJob() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('different')
  @Render('pages/different')
  different() {
    return {};
  }

  @Get('form')
  @Render('pages/form')
  form() {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/todoForm.css">',
    };
  }

  @Get('gallery')
  @Render('pages/gallery')
  gallery() {
    return {
      add_styles:
        '<!-- swiper -->' +
        '<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>' +
        '<link rel="stylesheet" href ="/css/gallery.css">',
    };
  }

  @Get('loaded_pictures')
  @Render('pages/loaded_pictures')
  loaded_pictures() {
    return {
      add_styles: '<link rel="stylesheet" href ="/css/loaded.css">',
    };
  }

  @Get('operation')
  @Render('pages/operation')
  operation() {
    return {};
  }

  @Get('physics')
  @Render('pages/physics')
  physics() {
    return {};
  }
}
