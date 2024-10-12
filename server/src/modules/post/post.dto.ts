import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDateString,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
} from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20000)
  content: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(125)
  category: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(125)
  author: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(125, { each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  @IsIn(["Draft", "Published", "Deleted"])
  status: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(20000)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  thumbnail: string;

  @IsOptional()
  @IsString()
  @MaxLength(125)
  category: string;

  @IsOptional()
  @IsDateString()
  dateTime: string;

  @IsOptional()
  @IsString()
  @MaxLength(125)
  author: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(125, { each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  @IsIn(["Draft", "Published", "Deleted"])
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;
}
