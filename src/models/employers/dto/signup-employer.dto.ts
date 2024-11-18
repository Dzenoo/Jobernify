import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanySize, IndustryType } from '../schemas/employer.schema';

export class SignUpEmployerDto {
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @IsString()
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
