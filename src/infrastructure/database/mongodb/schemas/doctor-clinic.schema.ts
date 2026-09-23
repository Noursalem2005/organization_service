import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorClinicDocument = DoctorClinicSchemaClass & Document;

@Schema({ collection: 'doctor_clinics', timestamps: true })
export class DoctorClinicSchemaClass {
  @Prop({ required: true, unique: true }) associationId: string;
  @Prop({ required: true, index: true }) doctorId: string;
  @Prop({ required: true, index: true }) clinicId: string;
  @Prop() consultationFee?: number;
  @Prop({ default: true }) isActive: boolean;
}

export const DoctorClinicSchema = SchemaFactory.createForClass(DoctorClinicSchemaClass);
DoctorClinicSchema.index({ doctorId: 1, clinicId: 1 }, { unique: true });
