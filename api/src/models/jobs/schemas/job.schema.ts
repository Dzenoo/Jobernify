import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Employer } from 'src/models/employers/schemas/employer.schema';
import { Application } from 'src/models/applications/schemas/application.schema';

export enum JobPosition {
  REMOTE = 'Remote',
  ONSITE = 'On-Site',
  HYBRID = 'Hybrid',
}

export enum JobType {
  INTERNSHIP = 'Internship',
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
  FREELANCE = 'Freelance',
}

export enum JobLevel {
  JUNIOR = 'Junior',
  MEDIOR = 'Medior',
  SENIOR = 'Senior',
  LEAD = 'Lead',
}

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    enum: JobPosition,
  })
  position: JobPosition;

  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  })
  location: string;

  @Prop({
    type: String,
    required: true,
    minlength: 30,
    maxlength: 300,
    trim: true,
  })
  overview: string;

  @Prop({
    type: String,
    required: true,
    enum: JobType,
  })
  type: JobType;

  @Prop({
    type: [String],
    required: true,
  })
  skills: string[];

  @Prop({
    type: String,
    required: true,
    enum: JobLevel,
  })
  level: JobLevel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  })
  company: Employer & string;

  @Prop({
    type: Number,
    required: true,
    min: 100,
    max: 500000,
  })
  salary: number;

  @Prop({
    type: Date,
    required: true,
  })
  expiration_date: Date;

  @Prop({
    type: String,
    required: true,
    minlength: 30,
    maxlength: 2500,
  })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    default: [],
  })
  applications: Application[] & string[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
