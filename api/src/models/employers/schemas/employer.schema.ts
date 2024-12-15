import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseUser } from 'src/models/shared/schemas/user.schema';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { Job } from 'src/models/jobs/schemas/job.schema';
import { CompanySize, IndustryType, Role } from 'shared';

import * as bcrypt from 'bcrypt';

export type EmployerDocument = HydratedDocument<Employer>;

@Schema({ timestamps: true })
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
    required: true,
    enum: Object.values(IndustryType),
  })
  industry: IndustryType;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(CompanySize),
  })
  size: CompanySize;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  })
  address: string;

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

  if (employer.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    employer.password = await bcrypt.hash(employer.password, salt);
  }

  next();
});
