import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class KeyToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "varchar", nullable: false })
  accessKey: string;

  @Column({ type: "varchar", nullable: false })
  refreshKey: string;

  @Column({ type: "varchar", nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
