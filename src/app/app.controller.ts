import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session/faunadb';
import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/index1')
  async root(@Session() session: SessionContainer) {
    return {
      ...(await this.appService.getSession(session)),
    };
  }

  @Get('signup')
  @Render('pages/auth_form')
  authForm(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @Get('login')
  @Render('pages/login_form')
  loginForm(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @Get('blog')
  @Render('pages/blog')
  blog(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="css/blog.css">' +
        '<link rel="stylesheet" href ="css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @Get('jobs/id/:id')
  @Render('pages/edit_job_card')
  job_card(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('jobs-list')
  @Render('pages/jobs')
  async getJobs(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/grid.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @Get('create-job')
  @Render('pages/create_job_card')
  async createJob(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @Get('/create-draft')
  @Render('pages/create_draft')
  async createDraft(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @Get('/posts/id/:id')
  @Render('pages/edit_draft')
  EditDraft(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @Get('different')
  @Render('pages/different')
  different(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
    };
  }

  @Get('form')
  @Render('pages/form')
  form(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/todoForm.css">',
    };
  }

  @Get('gallery')
  @Render('pages/gallery')
  gallery(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles:
        '<!-- swiper -->' +
        '<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>' +
        '<link rel="stylesheet" href ="/css/gallery.css">',
    };
  }

  @Get('loaded_pictures')
  @Render('pages/loaded_pictures')
  loaded_pictures(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
      add_styles: '<link rel="stylesheet" href ="/css/loaded.css">',
    };
  }

  @Get('operation')
  @Render('pages/operation')
  operation(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
    };
  }

  @Get('physics')
  @Render('pages/physics')
  physics(@Session() session: SessionContainer) {
    return {
      ...this.appService.getSession(session),
    };
  }
}
