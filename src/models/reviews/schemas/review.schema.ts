import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Employer } from 'src/models/employers/schemas/employer.schema';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';

export type ReviewDocument = HydratedDocument<Review>;

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
    enum: ['Freelance', 'Part-Time', 'Full-Time', 'Internship'],
  })
  type: 'Freelance' | 'Part-Time' | 'Full-Time' | 'Internship';

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: ['Less than 1', '1-2', '2-4', '4-7', '7-10', '10 or greater'],
  })
  time: 'Less than 1' | '1-2' | '2-4' | '4-7' | '7-10' | '10 or greater';

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
