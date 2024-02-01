import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { CrudController } from './controlles/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Tag])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class PostModule {}
