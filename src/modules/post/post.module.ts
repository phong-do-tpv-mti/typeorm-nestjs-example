import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { CrudController } from './controlles/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class PostModule {}
