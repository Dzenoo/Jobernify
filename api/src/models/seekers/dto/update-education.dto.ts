import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class UpdateEducationDto {
  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly institution?: string;

  @IsDateString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly graduationDate?: Date;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly fieldOfStudy?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  @Transform(({ value }) => sanitizeInput(value))
  readonly degree?: string;
}
