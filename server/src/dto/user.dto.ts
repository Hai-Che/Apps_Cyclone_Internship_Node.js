import { IsNotEmpty, IsUUID, Matches, MaxLength } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  @Matches(RegExp("^[a-zA-Z0-9]{6,}$"))
  userName: string;

  @IsNotEmpty()
  password: string;

  uass: string | null;

  @IsNotEmpty()
  @IsUUID()
  @MaxLength(36)
  uuid: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  fullName: string;

  email: string | null;

  phoneNumber: string | null;

  address: string | null;

  dob: Date | null;

  profileUrl: string | null;
}

export class UpdateUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @MaxLength(32)
  @Matches(RegExp("^[a-zA-Z0-9]{6,}$"))
  userName: string;

  uass: string | null;

  @IsNotEmpty()
  @IsUUID()
  @MaxLength(36)
  uuid: string;

  @IsNotEmpty()
  @MaxLength(128)
  @Matches(RegExp("^[a-zA-Zs]{6,64}$"))
  fullName: string;

  email: string | null;

  phoneNumber: string | null;

  address: string | null;

  dob: Date | null;

  profileUrl: string | null;
}
