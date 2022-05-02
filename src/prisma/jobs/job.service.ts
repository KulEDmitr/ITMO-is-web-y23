import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JobPlace, Prisma } from '@prisma/client';
import { CreateJobDto } from './models/create-job.dto';
import { UpdateJobDto } from './models/update-job.dto';

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

  async jobs(
    where?: Prisma.JobPlaceWhereInput,
    orderBy?: Prisma.JobPlaceOrderByWithRelationInput,
  ): Promise<JobPlace[] | null> {
    return this.prisma.jobPlace.findMany({ where, orderBy });
  }

  async createJob(data: CreateJobDto): Promise<JobPlace | null> {
    return this.prisma.jobPlace.create({
      data: {
        position: data.position,
        place: data.place,
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
    return this.prisma.jobPlace.update({
      where,
      data: {
        position: data.position,
        place: data.place,
        description: data.description,
        hidden: data.hidden,
      },
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
}
