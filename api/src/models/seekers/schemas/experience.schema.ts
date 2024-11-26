import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  JobLevel,
  JobPosition,
  JobType,
} from 'src/models/jobs/schemas/job.schema';

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

  @Prop({ required: true, enum: Object.values(JobPosition) })
  position: JobPosition;

  @Prop({ type: Boolean, default: false })
  isCurrentlyWorking: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
