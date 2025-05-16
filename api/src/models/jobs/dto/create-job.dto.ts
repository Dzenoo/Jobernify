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
  MinLength,
} from 'class-validator';
import { JobLevel, JobPosition, JobType } from '@/types';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Transform(({ value }) => sanitizeInput(value))
  readonly title: string;

  @IsEnum(JobPosition)
  readonly position: JobPosition;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Transform(({ value }) => sanitizeInput(value))
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  @Length(30, 300)
  @Transform(({ value }) => sanitizeInput(value))
  readonly overview: string;

  @IsEnum(JobType)
  readonly type: JobType;

  @Transform(({ value }) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @Transform(({ value }) => sanitizeInput(value))
  readonly skills: string[];

  @IsEnum(JobLevel)
  readonly level: JobLevel;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(100)
  @Max(500000)
  readonly salary: number;

  @IsDateString()
  readonly expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  @Length(30, 2500)
  @Transform(({ value }) =>
    sanitizeInput(value, {
      allowedTags: ['b', 'i', 'ul', 'li', 'ol'],
      allowedAttributes: {},
      disallowedTagsMode: 'discard',
    }),
  )
  readonly description: string;
}
