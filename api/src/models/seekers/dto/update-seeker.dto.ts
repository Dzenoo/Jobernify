import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class UpdateSeekerDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  @Transform(({ value }) => sanitizeInput(value))
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  @Transform(({ value }) => sanitizeInput(value))
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => sanitizeInput(value))
  readonly github?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => sanitizeInput(value))
  readonly linkedin?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => sanitizeInput(value))
  readonly portfolio?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => sanitizeInput(value))
  readonly skills?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Transform(({ value }) => sanitizeInput(value))
  readonly biography?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Transform(({ value }) => sanitizeInput(value))
  readonly headline?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly receiveJobAlerts?: boolean;

  @IsOptional()
  @IsString()
  image?: string;
}
