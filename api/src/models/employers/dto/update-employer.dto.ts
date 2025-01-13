import {
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanySize, IndustryType } from '@/types';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class UpdateEmployerDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => sanitizeInput(value))
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(IndustryType)
  readonly industry?: IndustryType;

  @IsOptional()
  @IsString()
  @IsEnum(CompanySize)
  readonly size?: CompanySize;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Transform(({ value }) => sanitizeInput(value))
  readonly address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  @Transform(({ value }) => sanitizeInput(value))
  readonly companyDescription?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitizeInput(value))
  readonly website?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
