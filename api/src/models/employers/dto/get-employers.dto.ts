import {
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEmployersDto {
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
  readonly sort?: 'followers';

  @IsOptional()
  @IsString()
  readonly size?: string;

  @IsOptional()
  @IsString()
  readonly industry?: string;

  @IsOptional()
  @IsString()
  readonly location?: string;
}
