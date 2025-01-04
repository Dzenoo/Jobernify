import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateSeekerDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly github?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly linkedin?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly portfolio?: string;

  @IsOptional()
  @IsArray()
  readonly skills?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly biography?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly headline?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly receiveJobAlerts?: boolean;

  @IsOptional()
  @IsString()
  image?: string;
}
