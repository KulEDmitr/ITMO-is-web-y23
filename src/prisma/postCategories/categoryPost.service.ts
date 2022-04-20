import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryPost, Prisma } from '@prisma/client';
import { CategoryPostDto } from './models/categoryPost.dto';

@Injectable()
export class CategoryPostService {
  constructor(private prisma: PrismaService) {}

  async categoryPost(
    categoryPostWhereUniqueInput: Prisma.CategoryPostWhereUniqueInput,
  ): Promise<CategoryPost | null> {
    return this.prisma.categoryPost.findUnique({
      where: categoryPostWhereUniqueInput,
    });
  }

  async getPosts(
    categoryPostWhereUniqueInput: Prisma.CategoryPostWhereUniqueInput,
    categoryPostInclude?: Prisma.CategoryPostInclude,
  ): Promise<CategoryPost> {
    return this.prisma.categoryPost.findUnique({
      where: categoryPostWhereUniqueInput,
      include: categoryPostInclude,
    });
  }

  async createCategoryPost(data: CategoryPostDto): Promise<CategoryPost> {
    return this.prisma.categoryPost.create({
      data: {
        name: data.name,
      },
    });
  }
}
