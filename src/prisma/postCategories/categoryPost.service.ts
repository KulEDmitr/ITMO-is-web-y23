import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostCategory, Prisma, Post } from '@prisma/client';
import { CreateCategoryPostDto } from './models/create-categoryPost.dto';
import { AlreadyExistException } from '../../exceptions/already-exist.exception';

@Injectable()
export class CategoryPostService {
  constructor(private prisma: PrismaService) {}

  async getPostsByCategory(
    categoryId: number,
    published?: boolean,
    authorId?: string,
  ): Promise<Post[] | null> {
    return await this.getPosts({
      published: published,
      categories: {
        some: {
          catId: categoryId,
        },
      },
      authorId: authorId,
    });
  }

  async categoryPost(
    categoryPostWhereUniqueInput: Prisma.PostCategoryWhereUniqueInput,
  ): Promise<PostCategory | null> {
    return this.prisma.postCategory.findUnique({
      where: categoryPostWhereUniqueInput,
    });
  }

  async getPosts(
    postWhereInput: Prisma.PostWhereInput,
  ): Promise<Post[] | null> {
    return this.prisma.post.findMany({
      where: postWhereInput,
    });
  }

  async categories(): Promise<PostCategory[] | null> {
    return this.prisma.postCategory.findMany();
  }

  async createCategoryPost(
    data: CreateCategoryPostDto,
  ): Promise<PostCategory | null> {
    const cat = await this.categoryPost({ name: data.name });
    if (cat != null) {
      throw new AlreadyExistException(
        'Category with name: "' + data.name + '" already exist in system',
      );
    }

    return this.prisma.postCategory.create({
      data: {
        name: data.name,
        posts: {
          create: data.posts?.map((post) => ({
            post: {
              connect: { id: post },
            },
          })),
        },
      },
    });
  }
}
