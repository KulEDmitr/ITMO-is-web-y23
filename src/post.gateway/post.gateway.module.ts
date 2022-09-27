import { Module } from '@nestjs/common';
import { PostsGateway } from './post.gateway';

@Module({
  providers: [PostsGateway]
})
export class EventsModule {}