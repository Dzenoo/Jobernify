import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Job } from 'src/models/jobs/schemas/job.schema';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';

export type ApplicationDocument = HydratedDocument<Application>;

export enum ApplicationStatus {
  Rejected = 'Rejected',
  Pending = 'Pending',
  Accepted = 'Accepted',
  Interview = 'Interview',
}

@Schema({ timestamps: true })
export class Application {
  @Prop({
    type: String,
    trim: true,
  })
  cover_letter: string;

  @Prop({
    type: String,
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;

  @Prop({
    type: String,
    required: [true, 'Resume is required'],
  })
  resume: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seeker',
  })
  seeker: Seeker;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  })
  job: Job;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
