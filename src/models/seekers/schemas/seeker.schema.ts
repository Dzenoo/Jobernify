import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SeekerDocument = HydratedDocument<Seeker>;

@Schema({ timestamps: true })
export class Seeker {
  @Prop({ required: true, minlength: 2, maxlength: 15 })
  first_name: string;

  @Prop({ required: true, minlength: 2, maxlength: 15 })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: '' })
  headline: string;

  @Prop({ default: '' })
  biography: string;

  @Prop({
    default:
      'https://res.cloudinary.com/drfmmwlsl/image/upload/v1709471817/o1bj9hofkvj18dictpxa.png',
    trim: true,
  })
  image: string;

  @Prop({ default: '' })
  portfolio: string;

  @Prop({ default: '' })
  linkedin: string;

  @Prop({ default: '' })
  github: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: [Object], default: [] })
  education: {
    institution: string;
    graduationDate: Date;
    fieldOfStudy: string;
    degree: string;
  }[];

  @Prop({ type: [Object], default: [] })
  experience: {
    jobTitle: string;
    companyName: string;
    startDate: Date;
    endDate: Date;
    level: string;
    type: string;
    location: string;
    position: string;
  }[];

  @Prop({ type: Object, default: { title: '', type: '', level: '' } })
  alerts: { title: string; type: string; level: string };

  @Prop({ default: '' })
  resume: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  verificationToken: string;

  @Prop()
  verificationExpiration: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    default: [],
  })
  savedJobs: any[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    default: [],
  })
  applications: any[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employer' }],
    default: [],
  })
  following: any[];
}

export const SeekerSchema = SchemaFactory.createForClass(Seeker);
