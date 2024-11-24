import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { PASSWORD_REGEX } from 'src/common/constants';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  readonly password: string;
}
