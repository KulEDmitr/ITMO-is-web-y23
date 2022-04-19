import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Post as PostModel,
  CategoryPost as CategoryPostModel,
} from '@prisma/client';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of post that need to be found',
    example: '1',
  })
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findPost({ id: Number(id) });
  }

  @ApiOperation({
    summary: 'Get all posts with authorId equal to given user id',
  })
  @ApiParam({
    name: 'authorId',
    type: 'string',
    description: 'User id of posts author for searching',
    example: '1',
  })
  @Get('feed/:authorId')
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

  @ApiOperation({
    summary: 'Get all published posts in system',
  })
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @ApiOperation({ summary: 'Create post with given parameters' })
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

  @ApiOperation({
    summary: 'Edit fields for existing post. All Body parameters are optional',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of post that need to be edited',
    example: '1',
  })
  @Put('post/:id/edit')
  async editPost(
    @Param('id') id: string,
    @Body()
    postData: {
      title?: string;
      content?: string;
      published?: boolean;
      categories?: CategoryPostModel[];
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

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of post that need to be deleted',
    example: '1',
  })
  @Delete('post/:id/delete')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  // @Delete(':authorId/posts/delete')
  // async removeAllPostsBy(
  //   @Param('authorId') authorId: string,
  //   @Body()
  //   postData: {
  //     published?: boolean;
  //     category?: string;
  //   },
  // ) {
  //   const { published, category } = postData;
  //   return this.postService.deleteAllPostsBy(
  //     {
  //       authorId: Number(authorId),
  //       published: published,
  //     },
  //     {
  //       categories: {
  //         where: {
  //           id: Number(category),
  //         },
  //       },
  //     },
  //   );
  // }
}
