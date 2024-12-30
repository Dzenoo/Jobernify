import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseUser } from 'src/models/shared/schemas/user.schema';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { Job } from 'src/models/jobs/schemas/job.schema';
import { CompanySize, IndustryType, Role } from '@jobernify/shared';

import * as bcrypt from 'bcrypt';

export type EmployerDocument = HydratedDocument<Employer>;

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
export class Employer extends BaseUser {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  industry?: IndustryType;

  @Prop({
    type: String,
  })
  size?: CompanySize;

  @Prop({
    type: String,
    trim: true,
  })
  address?: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/drfmmwlsl/image/upload/v1709471817/ufmtgu7n4kbbzspsod7a.png',
  })
  image: string;

  @Prop({ type: String, trim: true, default: '' })
  companyDescription: string;

  @Prop({ type: String, trim: true, default: '' })
  website: string;

  @Prop({ type: String, default: 'employer', enum: Role })
  role: Role;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  jobs: Job[] & string[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
    default: [],
  })
  followers: Seeker[] & string[];
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);

EmployerSchema.pre('save', async function (next) {
  const employer = this as EmployerDocument;

  if (employer.isModified('password') && employer.password) {
    const salt = await bcrypt.genSalt(10);
    employer.password = await bcrypt.hash(employer.password, salt);
  }

  next();
});
