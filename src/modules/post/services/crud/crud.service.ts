import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private dataSource: DataSource,
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

  async createPostWithTag(tagName: string) {
    let tag = await this.tagRepository.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = new Tag();
      tag.name = tagName;
      await this.tagRepository.save(tag);
    }

    const post = new Post();
    post.title = `Post of tag: ${tagName}`;
    post.tags = [tag];
    return await this.postRepository.save(post);
  }

  async findTagByName(tagName: string) {
    return this.tagRepository.findOne({
      where: { name: tagName },
      relations: ['posts'],
    });
  }

  async deletePostByTag(tagName: string) {
    const tag = await this.findTagByName(tagName);
    if (tag) {
      const postsToDelete = tag.posts;
      return await Promise.all([
        this.postRepository.remove(postsToDelete),
        this.tagRepository.remove(tag),
      ]);
    } else {
      return {
        message: 'Tag not found',
      };
    }
  }

  async createMultipleTag() {
    const queryRunner = this.dataSource.createQueryRunner();
    const tags = Array.from({ length: 100 }).map((item, index) => {
      const tag = new Tag();
      tag.name = `Tag ${(index + 1).toString().padStart(5, '0')}`;
      return tag;
    });

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(tags.map((tag) => queryRunner.manager.save(tag)));
      await queryRunner.commitTransaction();
      return tags;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
