import { IsDate, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  readonly institution: string;

  @IsDate()
  readonly graduationDate: Date;

  @IsString()
  readonly fieldOfStudy: string;

  @IsString()
  readonly degree: string;
}
