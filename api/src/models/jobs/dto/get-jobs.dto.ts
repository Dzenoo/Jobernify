import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetJobsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => (value ? Number(value) : 1))
  readonly page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => (value ? Number(value) : 10))
  readonly limit: number = 10;

  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;

  @IsOptional()
  @IsString()
  readonly seniority?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly salaryRange?: number;

  @IsOptional()
  @IsString()
  readonly position?: string;

  @IsOptional()
  @IsString()
  readonly sort?: string;
}
