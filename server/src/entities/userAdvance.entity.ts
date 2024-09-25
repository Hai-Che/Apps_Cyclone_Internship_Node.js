import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("UserAdvance")
export class UserAdvance {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: "varchar", length: 256, charset: "utf8mb4", nullable: true })
  address: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @Column({ type: "varchar", length: 128, charset: "utf8mb4", nullable: true })
  profileUrl: string;

  @Column({ type: "int", default: 1 })
  createdBy: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: "int", default: 1 })
  updatedBy: number;

  @UpdateDateColumn()
  updatedDate: Date;
}
