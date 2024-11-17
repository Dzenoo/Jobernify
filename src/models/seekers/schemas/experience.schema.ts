import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum JobLevel {
  JUNIOR = 'junior',
  MID = 'medior',
  SENIOR = 'senior',
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
}

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true, trim: true })
  jobTitle: string;

  @Prop({ required: true, trim: true })
  companyName: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  @Prop({ required: true, enum: Object.values(JobLevel) })
  level: JobLevel;

  @Prop({ required: true, enum: Object.values(JobType) })
  type: JobType;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ trim: true, default: '' })
  position: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
