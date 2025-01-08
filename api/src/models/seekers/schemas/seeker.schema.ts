import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseUser } from '@/models/shared/schemas/user.schema';
import {
  EducationSchema,
  Education,
} from '@/models/seekers/schemas/education.schema';
import {
  ExperienceSchema,
  Experience,
} from '@/models/seekers/schemas/experience.schema';
import { Job } from '@/models/jobs/schemas/job.schema';
import { Employer } from '@/models/employers/schemas/employer.schema';
import { Application } from '@/models/applications/schemas/application.schema';
import { JobLevel, JobType, Role } from '@/types';

import * as bcrypt from 'bcrypt';

export type SeekerDocumentOverride = {
  education: Types.DocumentArray<Education>;
  experience: Types.DocumentArray<Experience>;
};

export type SeekerDocument = HydratedDocument<Seeker, SeekerDocumentOverride>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      delete ret.twoFactorAuthSecret;
      delete ret.verificationToken;
      return ret;
    },
  },
})
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
    set: (skills: string[]) => skills.map((s) => s.toLowerCase().trim()),
  })
  skills: string[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({
    type: Object,
    default: { title: '', type: '', level: '' },
  })
  alerts: { title: string; type: JobType; level: JobLevel };

  @Prop({
    trim: true,
    default: '',
    // match: [
    //   /^https?:\/\/(www\.)?[^\s/$.?#].[^\s]*$/,
    //   'Invalid resume URL format',
    // ],
  })
  resume: string;

  @Prop({ type: String, default: 'seeker', enum: Role })
  role: Role;

  @Prop({ type: Boolean, default: false })
  receiveJobAlerts: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  savedJobs: Job[] & string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    default: [],
  })
  applications: Application[] & string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employer' }],
    default: [],
  })
  following: Employer[] & string;
}

export const SeekerSchema = SchemaFactory.createForClass(Seeker);

SeekerSchema.pre('save', async function (next) {
  const seeker = this as SeekerDocument;

  if (seeker.isModified('password') && seeker.password) {
    const salt = await bcrypt.genSalt(10);
    seeker.password = await bcrypt.hash(seeker.password, salt);
  }

  next();
});

SeekerSchema.index(
  { skills: 1 },
  { partialFilterExpression: { emailVerified: true } },
);
