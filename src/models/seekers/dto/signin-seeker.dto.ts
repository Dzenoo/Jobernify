import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SigninSeekerDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  readonly password: string;
}
