import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupSeekerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  readonly first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  readonly last_name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  readonly password: string;
}
