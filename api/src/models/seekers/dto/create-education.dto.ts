import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  readonly institution: string;

  @IsDateString()
  @IsNotEmpty()
  readonly graduationDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly fieldOfStudy: string;

  @IsString()
  @IsNotEmpty()
  readonly degree: string;
}
