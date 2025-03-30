import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  worksAt: string | undefined;

  @IsString()
  @IsNotEmpty()
  location: string;

  linkedin: string | undefined;

  github: string | undefined;

  website: string | undefined;

  bio: string;

  about: string | undefined;

  image: string | undefined;

  @IsNotEmpty()
  @IsString({ each: true })
  especialities: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  technologies: string[];
}

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  worksAt: string | undefined;

  @IsString()
  @IsNotEmpty()
  location: string;

  linkedin: string | undefined;

  github: string | undefined;

  website: string | undefined;

  bio: string;

  about: string | undefined;

  image: string | undefined;

  especialities: string[];

  technologies: string[];
}
