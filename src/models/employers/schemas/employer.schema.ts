import mongoose, { HydratedDocument } from 'mongoose';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Job } from 'src/models/jobs/schemas/job.schema';
import { Review } from 'src/models/reviews/schemas/review.schema';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { BaseUser } from 'src/models/shared/schemas/user.schema';

export type EmployerDocument = HydratedDocument<Employer>;

export enum IndustryType {
  TECHNOLOGY = 'technology',
  HEALTHCARE = 'healthcare',
  FINANCE = 'finance',
  EDUCATION = 'education',
  MANUFACTURING = 'manufacturing',
  RETAIL = 'retail',
  HOSPITALITY = 'hospitality',
  AUTOMOTIVE = 'automotive',
  CONSTRUCTION = 'construction',
  MEDIA = 'media',
  MARKETING = 'marketing',
  TELECOMMUNICATIONS = 'telecommunications',
  GOVERNMENT = 'government',
  NONPROFIT = 'nonprofit',
  OTHER = 'other',
}

export enum CompanySize {
  LESS_THAN_17 = 'Less-than-17',
  BETWEEN_20_AND_50 = '20-50',
  BETWEEN_50_AND_100 = '50-100',
  BETWEEN_100_AND_250 = '100-250',
  BETWEEN_250_AND_500 = '250-500',
  BETWEEN_500_AND_1000 = '500-1000',
}

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  jobs: Job[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
    default: [],
  })
  followers: Seeker[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    default: [],
  })
  reviews: Review;

  constructor(bcryptService: BcryptService) {
    super(bcryptService);
  }
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);

EmployerSchema.pre('save', async function (next) {
  const employer = this as EmployerDocument;

  if (employer.isModified('password')) {
    await employer.hashPassword();
  }

  next();
});
