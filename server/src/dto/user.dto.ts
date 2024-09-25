import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  @Matches(RegExp("^[a-zA-Z0-9]{6,}$"))
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(255)
  uass: string;

  @IsNotEmpty()
  @IsUUID()
  @MaxLength(36)
  uuid: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  profileUrl: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @MaxLength(32)
  @Matches(RegExp("^[a-zA-Z0-9]{6,}$"))
  userName: string;

  @IsString()
  @MaxLength(255)
  uass: string;

  @IsNotEmpty()
  @IsUUID()
  @MaxLength(36)
  uuid: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  profileUrl: string;
}
