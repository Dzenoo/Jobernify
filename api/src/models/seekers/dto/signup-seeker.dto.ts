import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupSeekerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  readonly last_name: string;

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
}
