import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
