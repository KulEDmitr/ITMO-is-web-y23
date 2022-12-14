import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JobPlace, Prisma, User } from '@prisma/client';
import { CreateJobDto } from './models/create-job.dto';
import { UpdateJobDto } from './models/update-job.dto';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async findJobById(id: number): Promise<JobPlace | null> {
    return this.findJob({ id: id });
  }

  async findJob(
    jobWhereUniqueInput: Prisma.JobPlaceWhereUniqueInput,
  ): Promise<JobPlace | null> {
    return this.prisma.jobPlace.findUnique({
      where: jobWhereUniqueInput,
    });
  }

  async getMainJobs(take?: number): Promise<JobPlace[] | null> {
    return this.jobs({ startDate: 'desc' }, 0, take);
  }

  async jobs(
    orderBy?: Prisma.JobPlaceOrderByWithRelationInput,
    skip?: number,
    take?: number,
    where?: Prisma.JobPlaceWhereInput,
  ): Promise<JobPlace[] | null> {
    return this.prisma.jobPlace.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createJob(data: CreateJobDto): Promise<JobPlace | null> {
    if (data.workerId != undefined) {
      await this.checkUser({ id: data.workerId });
    }
    return this.prisma.jobPlace.create({
      data: {
        position: data.position,
        place: data.place,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        hidden: data.hidden,
        worker: {
          connect: { id: data.workerId },
        },
      },
    });
  }

  async updateJobById(
    id: number,
    data: UpdateJobDto,
  ): Promise<JobPlace | null> {
    return this.updateJob({ id: id }, data);
  }

  async updateJob(
    where: Prisma.JobPlaceWhereUniqueInput,
    data: UpdateJobDto,
  ): Promise<JobPlace | null> {
    await this.checkJobPlace(where);

    return this.prisma.jobPlace.update({
      where,
      data: { ...data },
    });
  }

  async deleteJobById(id: number): Promise<JobPlace | null> {
    return this.deleteJob({ id: id });
  }

  async deleteJob(where: Prisma.JobPlaceWhereUniqueInput): Promise<JobPlace> {
    return this.prisma.jobPlace.delete({
      where,
    });
  }

  private async checkUser(where: Prisma.UserWhereUniqueInput) {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });
    if (user == null) {
      throw new NotFoundException('User with given data does not exist');
    }
  }

  private async checkJobPlace(where: Prisma.JobPlaceWhereUniqueInput) {
    const job: JobPlace | null = await this.prisma.jobPlace.findUnique({
      where,
    });
    if (job == null) {
      throw new NotFoundException('Job place with given data does not exist');
    }
  }
}
