import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateEducationDto {
  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly institution?: string;

  @IsDateString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly graduationDate?: Date;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly fieldOfStudy?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((obj, value) => value !== undefined)
  readonly degree?: string;
}
