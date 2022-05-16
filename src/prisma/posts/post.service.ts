import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma, User } from '@prisma/client';
import { CreatePostDto } from './models/create-post.dto';
import { UpdatePostDto } from './models/update-post.dto';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findPostById(id: number): Promise<Post | null> {
    return this.findPost({ id: id });
  }

  async findPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(
    take?: number,
    where?: Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByWithRelationInput,
  ): Promise<Post[] | null> {
    return this.prisma.post.findMany({ take, where, orderBy });
  }

  async getPage(
    take?: number,
    skip?: number,
    cursor?: Prisma.PostWhereUniqueInput,
    where?: Prisma.PostWhereInput,
  ): Promise<Post[] | null> {
    return this.prisma.post.findMany({
      take,
      skip,
      cursor: cursor,
      where,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createPost(data: CreatePostDto): Promise<Post | null> {
    const exist_cat = await this.checkCategories(data.categories);
    if (data.authorId != undefined) {
      await this.checkUser({ id: data.authorId });
    }

    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        author: {
          connect: { id: data.authorId },
        },
        categories: {
          create: exist_cat?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async updatePostById(id: number, data: UpdatePostDto): Promise<Post | null> {
    return this.updatePost({ id: id }, data);
  }

  async updatePost(
    where: Prisma.PostWhereUniqueInput,
    data: UpdatePostDto,
  ): Promise<Post | null> {
    const exist_cat = await this.checkCategories(data.categories);
    await this.checkPost(where);

    return this.prisma.post.update({
      where,
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        categories: {
          create: exist_cat?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async deletePostById(id: number): Promise<Post | null> {
    return this.deletePost({ id: id });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

  private async checkCategories(
    categories?: number[],
  ): Promise<number[] | null> {
    if (categories == undefined) {
      return categories;
    }
    const exist_cats = categories?.filter(
      (cat) =>
        this.prisma.pictureCategory.findUnique({ where: { id: cat } }) != null,
    );
    return exist_cats.length == 0 ? undefined : exist_cats;
  }

  private async checkUser(where: Prisma.UserWhereUniqueInput) {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });
    if (user == null) {
      throw new NotFoundException('User with given data does not exist');
    }
  }

  private async checkPost(where: Prisma.PostWhereUniqueInput) {
    const post: Post | null = await this.prisma.post.findUnique({
      where,
    });
    if (post == null) {
      throw new NotFoundException('Post with given data does not exist');
    }
  }
}
