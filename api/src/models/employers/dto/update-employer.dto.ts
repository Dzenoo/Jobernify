import {
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanySize, IndustryType } from '../schemas/employer.schema';

export class UpdateEmployerDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
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
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly companyDescription?: string;

  @IsOptional()
  @IsString()
  readonly website?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
