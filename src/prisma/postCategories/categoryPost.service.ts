import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostCategory, Prisma, Post } from '@prisma/client';
import { CreateCategoryPostDto } from './models/create-categoryPost.dto';

@Injectable()
export class CategoryPostService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.postCategory.create({
      data: {
        name: data.name,
      },
    });
  }
}
