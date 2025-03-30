import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { types } from 'util';

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
  @IsDate()
  startDate: Date;

  endDate: Date | undefined;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString({ each: true })
  technologies: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  types: string[];
}
