import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  image: string | undefined;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  publishedAt: Date | undefined;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  image: string | undefined;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  publishedAt: Date | undefined;

}


