import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create() {
    const post = new Post();
    post.title = `Post - ${Date.now()}`;

    const comment1 = new Comment();
    comment1.text = `Comment 1 of post: ${post.title}`;

    const comment2 = new Comment();
    comment2.text = `Comment 2 of post: ${post.title}`;

    post.comments = [comment1, comment2];

    return await this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        comments: true,
      },
      select: {
        id: true,
        title: true,
        comments: {
          text: true,
        },
      },
    });
  }

  findOne(id: number) {
    return id;
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }
}
