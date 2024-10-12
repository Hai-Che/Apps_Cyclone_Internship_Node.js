import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PostStatus {
  Draft = "Draft",
  Published = "Published",
  Deleted = "Deleted",
}

@Entity("Post")
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ type: "int" })
  userId: number;

  @Column({ type: "varchar", length: 250 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", length: 2048 })
  thumbnail: string;

  @Column({ type: "varchar", length: 125 })
  category: string;

  @Column({ type: "date" })
  dateTime: Date;

  @Column({ type: "varchar", length: 125 })
  author: string;

  @Column({ type: "simple-array" })
  tags: string[];

  @Column({
    type: "enum",
    enum: PostStatus,
    default: PostStatus.Draft,
  })
  status: PostStatus;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @Column({ type: "int", default: 0 })
  views: number;

  @Column({ type: "int", default: 0 })
  totalComments: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
