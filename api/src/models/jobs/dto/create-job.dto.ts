import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  Min,
  Max,
  Length,
  IsDateString,
} from 'class-validator';
import { JobType, JobLevel, Position } from '../schemas/job.schema';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  readonly title: string;

  @IsEnum(Position)
  readonly position: Position;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  @Length(30, 300)
  readonly overview: string;

  @IsEnum(JobType)
  readonly type: JobType;

  @IsArray()
  @IsString({ each: true })
  readonly skills: string[];

  @IsEnum(JobLevel)
  readonly level: JobLevel;

  @IsNumber()
  @Min(100)
  @Max(500000)
  readonly salary: number;

  @IsDateString()
  readonly expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  @Length(30, 2500)
  readonly description: string;
}
