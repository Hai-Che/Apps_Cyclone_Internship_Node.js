import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  @Matches(RegExp("^[a-zA-Z0-9]{6,}$"))
  userName: string;

  @IsNotEmpty()
  @MinLength(6)
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
  @Matches(RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim))
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

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  uass: string;

  @IsOptional()
  @IsUUID()
  @MaxLength(36)
  uuid: string;

  @IsOptional()
  @MaxLength(128)
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  fullName: string;

  @IsEmail()
  @Matches(RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim))
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  address: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsOptional()
  @IsString()
  profileUrl: string;

  @IsOptional()
  @IsString()
  gender: string;
}
