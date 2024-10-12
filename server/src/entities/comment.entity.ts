import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  userId: number;

  @Column({ type: "int" })
  postId: number;

  @Column({ type: "varchar", length: 250 })
  content: string;

  @Column({ nullable: true })
  parentCommentId: number;

  @Column("simple-array")
  replies: string[];

  @Column({ default: false })
  isHidden: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
