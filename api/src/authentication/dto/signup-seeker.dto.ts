import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { sanitizeInput } from '@/common/utils';

export class SignupSeekerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  @Transform(({ value }) => sanitizeInput(value))
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  @Transform(({ value }) => sanitizeInput(value))
  readonly last_name: string;

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
}
