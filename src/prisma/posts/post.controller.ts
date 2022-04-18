import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryPost } from '@prisma/client';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findPost({ id: Number(id) });
  }

  @Get('posts/:authorId')
  async getPostsByAuthorId(
    @Param('authorId') authorId: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        authorId: {
          equals: Number(authorId),
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Post('post/create')
  async createDraft(
    @Body()
    postData: {
      title: string;
      content?: string;
      authorId: string;
    },
  ): Promise<PostModel> {
    const { title, content, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { id: Number(authorId) },
      },
    });
  }

  @Put('post/:id/edit')
  async editPost(
    @Param('id') id: string,
    @Body()
    postData: {
      title?: string;
      content?: string;
      published?: boolean;
      categories?: CategoryPost[];
    },
  ): Promise<PostModel> {
    const { title, content, published, categories } = postData;
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: {
        published: published,
        title: title,
        content: content,
        categories: {
          connect: [...categories],
        },
      },
    });
  }

  @Delete('post/:id/delete')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
