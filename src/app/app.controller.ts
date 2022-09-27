import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session/faunadb';
import { OptionalAuthGuard } from '../auth/auth.optional.quard';
import { AuthGuard } from '../auth/auth.guard';

@ApiExcludeController()
@Controller()
export class AppController {
  @UseGuards(OptionalAuthGuard)
  @Get()
  @Render('pages/index1')
  async root(@Session() session: SessionContainer) {
    return {};
  }

  @UseGuards(OptionalAuthGuard)
  @Get('signup')
  @Render('pages/auth/auth_form')
  authForm(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('login')
  @Render('pages/auth/login_form')
  loginForm(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="css/form.css">' +
        '<link rel="stylesheet" href ="css/authForm.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('blog')
  @Render('pages/posts/blog')
  blog(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="css/blog.css">' +
        '<link rel="stylesheet" href ="css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @UseGuards(AuthGuard)
  @Get('jobs/id/:id')
  @Render('pages/jobs/edit_job_card')
  job_card(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('jobs-list')
  @Render('pages/jobs/jobs')
  async getJobs(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/grid.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/load_pagination.css">',
    };
  }

  @UseGuards(AuthGuard)
  @Get('create-job')
  @Render('pages/jobs/create_job_card')
  async createJob(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/job_card.css">',
    };
  }

  @UseGuards(AuthGuard)
  @Get('create-draft')
  @Render('pages/posts/create_draft')
  async createDraft(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('/posts/id/:id')
  @Render('pages/posts/edit_draft')
  async editDraft(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/card.css">' +
        '<link rel="stylesheet" href ="/css/blog.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('different')
  @Render('pages/different')
  different(@Session() session: SessionContainer) {
    return {};
  }

  @UseGuards(OptionalAuthGuard)
  @Get('form')
  @Render('pages/form')
  form(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<link rel="stylesheet" href ="/css/form.css">' +
        '<link rel="stylesheet" href ="/css/todoForm.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('gallery')
  @Render('pages/gallery')
  gallery(@Session() session: SessionContainer) {
    return {
      add_styles:
        '<!-- swiper -->' +
        '<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>' +
        '<link rel="stylesheet" href ="/css/gallery.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('loaded_pictures')
  @Render('pages/loaded_pictures')
  loaded_pictures(@Session() session: SessionContainer) {
    return {
      add_styles: '<link rel="stylesheet" href ="/css/loaded.css">',
    };
  }

  @UseGuards(OptionalAuthGuard)
  @Get('operation')
  @Render('pages/operation')
  operation(@Session() session: SessionContainer) {
    return {};
  }

  @UseGuards(OptionalAuthGuard)
  @Get('physics')
  @Render('pages/physics')
  physics(@Session() session: SessionContainer) {
    return {};
  }
}
