import mongoose, { HydratedDocument } from 'mongoose';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generatePasswordHash, verifyPassword } from 'src/common/utils/bcrypt';

export type EmployerDocument = HydratedDocument<Employer>;

enum IndustryType {
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

enum CompanySize {
  LESS_THAN_17 = 'Less-than-17',
  BETWEEN_20_AND_50 = '20-50',
  BETWEEN_50_AND_100 = '50-100',
  BETWEEN_100_AND_250 = '100-250',
  BETWEEN_250_AND_500 = '250-500',
  BETWEEN_500_AND_1000 = '500-1000',
}

@Schema({ timestamps: true })
export class Employer {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [5, 'Name must be at least 5 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    minlength: [5, 'Email must be at least 5 characters'],
    maxlength: [255, 'Email cannot exceed 255 characters'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Password must be at least 10 characters'],
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Industry is required'],
    enum: Object.values(IndustryType),
  })
  industry: IndustryType;

  @Prop({
    type: String,
    required: [true, 'Company size is required'],
    enum: Object.values(CompanySize),
  })
  size: CompanySize;

  @Prop({
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters'],
    maxlength: [100, 'Address cannot exceed 100 characters'],
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
  jobs: mongoose.Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' }],
    default: [],
  })
  followers: Seeker[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    default: [],
  })
  reviews: mongoose.Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, select: false })
  verificationToken: string;

  @Prop({ type: Date })
  verificationExpiration: Date;

  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await generatePasswordHash(this.password);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await verifyPassword(password, this.password);
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
