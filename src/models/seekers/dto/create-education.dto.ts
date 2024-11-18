import { IsDate, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsDate()
  graduationDate: Date;

  @IsString()
  fieldOfStudy: string;

  @IsString()
  degree: string;
}
