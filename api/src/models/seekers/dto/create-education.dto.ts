import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  readonly institution: string;

  @IsDateString()
  @IsNotEmpty()
  readonly graduationDate: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  readonly fieldOfStudy: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  readonly degree: string;
}
