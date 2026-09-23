import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorProfileDocument = DoctorProfileSchemaClass & Document;

@Schema({ collection: 'doctor_profiles', timestamps: true })
export class DoctorProfileSchemaClass {
  @Prop({ required: true, unique: true }) doctorId: string;
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true }) specialty: string;
  @Prop() subSpecialty?: string;
  @Prop({ required: true, unique: true }) licenseNumber: string;
  @Prop() bio?: string;
  @Prop() phoneNumber?: string;
  @Prop() yearsOfExperience?: number;
}

export const DoctorProfileSchema = SchemaFactory.createForClass(DoctorProfileSchemaClass);
