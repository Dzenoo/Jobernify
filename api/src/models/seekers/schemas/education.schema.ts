import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Education {
  @Prop({ required: true, trim: true })
  institution: string;

  @Prop({ required: true })
  graduationDate: Date;

  @Prop({ required: true, trim: true })
  fieldOfStudy: string;

  @Prop({ required: true, trim: true })
  degree: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
