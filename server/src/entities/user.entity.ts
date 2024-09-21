import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: "varchar",
    length: 32,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: false,
  })
  userName: string;

  @Column({
    type: "varchar",
    length: 255,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    default: null,
  })
  uass: string | null;

  @Column({
    type: "varchar",
    length: 36,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: false,
  })
  uuid: string;

  @Column({
    type: "varchar",
    length: 128,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: false,
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 64,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    default: null,
  })
  email: string | null;

  @Column({
    type: "varchar",
    length: 16,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    default: null,
  })
  phoneNumber: string | null;

  @Column({ type: "int", default: 1, nullable: false })
  createdBy: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: "int", default: 1, nullable: false })
  updatedBy: number;

  @UpdateDateColumn()
  updatedDate: Date;
}
