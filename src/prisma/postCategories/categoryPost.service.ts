import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostCategory, Prisma, Post, User } from '@prisma/client';
import { CreateCategoryPostDto } from './models/create-categoryPost.dto';
import { AlreadyExistException } from '../../exceptions/already-exist.exception';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class CategoryPostService {
  constructor(private prisma: PrismaService) {}

  async getPostsByCategory(
    categoryId: number,
    published?: boolean,
    authorId?: string,
  ): Promise<Post[] | null> {
    if (authorId != undefined) {
      await this.checkUser({ id: authorId });
    }
    await this.checkCategory({ id: categoryId }, true);

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
    await this.checkCategory({ name: data.name }, false);
    const exist_posts = await this.checkPosts(data.posts);

    return this.prisma.postCategory.create({
      data: {
        name: data.name,
        posts: {
          create: exist_posts?.map((post) => ({
            post: {
              connect: { id: post },
            },
          })),
        },
      },
    });
  }

  private async checkCategory(
    where: Prisma.PostCategoryWhereUniqueInput,
    exist: boolean,
  ) {
    const cat = await this.categoryPost(where);
    if (!exist && cat != null) {
      throw new AlreadyExistException('Category with given data already exist');
    }
    if (exist && cat == null) {
      throw new NotFoundException('Category with given data do not exist');
    }
  }

  private async checkUser(where: Prisma.UserWhereUniqueInput) {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });
    if (user == null) {
      throw new NotFoundException(
        'User with given data does not exist',
      );
    }
  }

  private async checkPosts(posts?: number[]): Promise<number[] | null> {
    const exist_posts = posts?.filter(
      (post) => this.prisma.post.findUnique({ where: { id: post } }) != null,
    );
    return exist_posts.length == 0 ? undefined : exist_posts;
  }
}
