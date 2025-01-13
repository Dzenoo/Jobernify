import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class ApplyToJobDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => sanitizeInput(value))
  coverLetter?: string;
}
