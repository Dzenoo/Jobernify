import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanySize, IndustryType } from '@/types';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class SignUpEmployerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  @Transform(({ value }) => sanitizeInput(value))
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Transform(({ value }) => sanitizeInput(value))
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => sanitizeInput(value))
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @Transform(({ value }) => sanitizeInput(value))
  readonly address: string;

  @IsString()
  @IsEnum(CompanySize)
  @Transform(({ value }) => sanitizeInput(value))
  readonly size: CompanySize;

  @IsString()
  @IsEnum(IndustryType)
  @Transform(({ value }) => sanitizeInput(value))
  readonly industry: IndustryType;
}
