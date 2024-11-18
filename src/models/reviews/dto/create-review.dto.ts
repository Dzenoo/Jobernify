import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { EmploymentDuration, EmploymentType } from '../schemas/review.schema';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  job_position: string;

  @IsEnum(EmploymentType)
  type: EmploymentType;

  @IsEnum(EmploymentDuration)
  time: EmploymentDuration;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  negativeReview: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  positiveReview: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(30, { each: true })
  technologies: string[];
}
