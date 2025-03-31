import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  image: string | undefined;

  status: string;

  @IsNotEmpty()
  startDate: Date;

  endDate: Date | undefined;

  @IsNotEmpty()
  @IsString({ each: true })
  technologies: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  types: string[];
}

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  image: string | undefined;

  status: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  endDate: Date | undefined;

  @IsNotEmpty()
  @IsString({ each: true })
  technologies: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  types: string[];
}