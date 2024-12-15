import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanySize, IndustryType } from 'shared';

export class SignUpEmployerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  readonly address: string;

  @IsString()
  @IsEnum(CompanySize)
  readonly size: CompanySize;

  @IsString()
  @IsEnum(IndustryType)
  readonly industry: IndustryType;
}
