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

  @Column({ type: "varchar", length: 256, charset: "utf8mb4", default: null })
  address: string | null;

  @Column({ type: "date", default: null })
  dob: Date | null;

  @Column({ type: "varchar", length: 128, charset: "utf8mb4", default: null })
  profileUrl: string | null;

  @Column({ type: "int", default: 1, nullable: false })
  createdBy: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: "int", default: 1, nullable: false })
  updatedBy: number;

  @UpdateDateColumn()
  updatedDate: Date;
}
