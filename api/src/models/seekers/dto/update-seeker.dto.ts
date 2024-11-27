import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';

export class UpdateSeekerDto {
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  readonly github?: string;

  @IsOptional()
  @IsString()
  readonly linkedin?: string;

  @IsOptional()
  @IsString()
  readonly portfolio?: string;

  @IsOptional()
  @IsArray()
  readonly skills?: string[];

  @IsOptional()
  @IsString()
  readonly biography?: string;

  @IsOptional()
  @IsString()
  readonly headline?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly receiveJobAlerts?: boolean;

  @IsOptional()
  @IsString()
  image?: string;
}
