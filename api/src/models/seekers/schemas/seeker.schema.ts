import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseUser, Role } from 'src/models/shared/schemas/user.schema';
import { EducationSchema, Education } from './education.schema';
import { ExperienceSchema, Experience } from './experience.schema';
import { Job, JobLevel, JobType } from 'src/models/jobs/schemas/job.schema';
import { Employer } from 'src/models/employers/schemas/employer.schema';
import { Application } from 'src/models/applications/schemas/application.schema';

import * as bcrypt from 'bcrypt';

export type SeekerDocumentOverride = {
  education: Types.DocumentArray<Education>;
  experience: Types.DocumentArray<Experience>;
};

export type SeekerDocument = HydratedDocument<Seeker, SeekerDocumentOverride>;

@Schema({ timestamps: true })
export class Seeker extends BaseUser {
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
  })
  last_name: string;

  @Prop({ trim: true, default: '' })
  headline: string;

  @Prop({ trim: true, default: '' })
  biography: string;

  @Prop({
    default:
      'https://res.cloudinary.com/drfmmwlsl/image/upload/v1709471817/o1bj9hofkvj18dictpxa.png',
    trim: true,
  })
  image: string;

  @Prop({
    trim: true,
    default: '',
    match: [
      /^https?:\/\/(www\.)?[^\s/$.?#].[^\s]*$/,
      'Invalid portfolio URL format',
    ],
  })
  portfolio: string;

  @Prop({
    trim: true,
    default: '',
    match: [
      /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
      'Invalid LinkedIn URL format',
    ],
  })
  linkedin: string;

  @Prop({
    trim: true,
    default: '',
    match: [
      /^https?:\/\/(www\.)?github\.com\/.*$/,
      'Invalid GitHub URL format',
    ],
  })
  github: string;

  @Prop({
    type: [String],
    default: [],
    set: (skills) => skills.map((s) => s.toLowerCase().trim()),
  })
  skills: string[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({
    type: Object,
    default: { title: '', type: JobType.FULL_TIME, level: JobLevel.JUNIOR },
  })
  alerts: { title: string; type: JobType; level: JobLevel };

  @Prop({
    trim: true,
    default: '',
    match: [
      /^https?:\/\/(www\.)?[^\s/$.?#].[^\s]*$/,
      'Invalid resume URL format',
    ],
  })
  resume: string;

  @Prop({ type: String, default: 'seeker', enum: Role })
  role: Role;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  savedJobs: Job[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    default: [],
  })
  applications: Application[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employer' }],
    default: [],
  })
  following: Employer[];
}

export const SeekerSchema = SchemaFactory.createForClass(Seeker);

SeekerSchema.pre('save', async function (next) {
  const seeker = this as SeekerDocument;

  if (seeker.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    seeker.password = await bcrypt.hash(seeker.password, salt);
  }

  next();
});
