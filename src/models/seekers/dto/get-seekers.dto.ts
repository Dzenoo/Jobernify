import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetSeekersDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => (value ? Number(value) : 1))
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => (value ? Number(value) : 10))
  limit: number = 10;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
