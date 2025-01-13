import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitizeInput } from '@/common/utils';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  message: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  threadId: string;
}
