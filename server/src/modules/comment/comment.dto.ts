import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
} from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  content: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsOptional()
  @IsNumber()
  parentCommentId: number;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  content: string;
}
