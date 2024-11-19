import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Employer } from 'src/models/employers/schemas/employer.schema';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';

export type ReviewDocument = HydratedDocument<Review>;

export enum EmploymentType {
  Freelance = 'Freelance',
  PartTime = 'Part-Time',
  FullTime = 'Full-Time',
  Internship = 'Internship',
}

export enum EmploymentDuration {
  LessThanOne = 'Less than 1',
  OneToTwo = '1-2',
  TwoToFour = '2-4',
  FourToSeven = '4-7',
  SevenToTen = '7-10',
  TenOrGreater = '10 or greater',
}

@Schema({ timestamps: true })
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  })
  company: Employer;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  })
  job_position: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: EmploymentType,
  })
  type: EmploymentType;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: EmploymentDuration,
  })
  time: EmploymentDuration;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 300,
  })
  negativeReview: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 300,
  })
  positiveReview: string;

  @Prop({
    type: [String],
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  })
  technologies: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seeker',
    required: true,
  })
  seeker: Seeker;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
