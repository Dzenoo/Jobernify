import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class TwoFactorCodeDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  code: string;
}

export class TwoFactorVerifyDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  code: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  userId: string;
}
