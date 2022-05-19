import { Controller, Get, Render, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Render('pages/index1')
  async root(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
    };
  }

  @Get('signup')
  @Render('pages/auth_form')
  authForm(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @Get('login')
  @Render('pages/login_form')
  loginForm(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @Get('blog')
  @Render('pages/blog')
  blog(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="css/blog.css">' +
        '<link rel="stylesheet" href ="css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @Get('jobs/id/:id')
  @Render('pages/edit_job_card')
  job_card(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('jobs-list')
  @Render('pages/jobs')
  async getJobs(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/grid.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @Get('create-job')
  @Render('pages/create_job_card')
  async createJob(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('/create-draft')
  @Render('pages/create_draft')
  async createDraft(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @Get('/posts/id/:id')
  @Render('pages/edit_draft')
  EditDraft(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @Get('different')
  @Render('pages/different')
  different(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
    };
  }

  @Get('form')
  @Render('pages/form')
  form(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/todoForm.css">',
    };
  }

  @Get('gallery')
  @Render('pages/gallery')
  gallery(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles:
        '<!-- swiper -->' +
        '<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>' +
        '<link rel="stylesheet" href ="/css/gallery.css">',
    };
  }

  @Get('loaded_pictures')
  @Render('pages/loaded_pictures')
  loaded_pictures(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
      add_styles: '<link rel="stylesheet" href ="/css/loaded.css">',
    };
  }

  @Get('operation')
  @Render('pages/operation')
  operation(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
    };
  }

  @Get('physics')
  @Render('pages/physics')
  physics(@Res() res) {
    return {
      is_auth: res.is_auth,
      login: res.login,
    };
  }
}
