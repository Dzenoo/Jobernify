import { HydratedDocument } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export type BaseUserDocument = HydratedDocument<BaseUser>;

export abstract class BaseUser {
  @Prop({
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    select: false,
  })
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ type: String, select: false })
  verificationToken: string;

  @Prop({ type: Date })
  verificationExpiration: Date;
}
