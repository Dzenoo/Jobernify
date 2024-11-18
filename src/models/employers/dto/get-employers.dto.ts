import {
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  Max,
  Min,
  IsEnum,
} from 'class-validator';
import { IndustryType } from '../schemas/employer.schema';
import { Transform } from 'class-transformer';
import { CompanySize } from '../schemas/employer.schema';

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
  readonly search: string;

  @IsOptional()
  @IsString()
  readonly sort: 'followers' | 'reviews';

  @IsOptional()
  @IsString()
  @IsEnum(CompanySize)
  readonly size: CompanySize;

  @IsOptional()
  @IsString()
  @IsEnum(IndustryType)
  readonly industry: IndustryType;
}
