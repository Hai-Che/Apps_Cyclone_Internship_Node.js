import { IsEmail, IsNotEmpty, Matches, Min, MinLength } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Matches(RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim))
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class VerifyUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  verificationCode: string;
}
