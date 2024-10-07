import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum UserRole {
  User = "User",
  Admin = "Admin",
  Moderator = "Moderator",
}

enum Gender {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: "varchar",
    length: 32,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
  })
  userName: string;

  @Column({
    type: "varchar",
    length: 255,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: true,
  })
  uass: string;

  @Column({
    type: "varchar",
    length: 36,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
  })
  uuid: string;

  @Column({
    type: "varchar",
    length: 128,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 64,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 16,
    charset: "utf8mb4",
    collation: "utf8mb4_general_ci",
    nullable: true,
  })
  phoneNumber: string;

  @Column({ type: "int", default: 1 })
  createdBy: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: "int", default: 1 })
  updatedBy: number;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ nullable: true })
  salt: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender;
}
