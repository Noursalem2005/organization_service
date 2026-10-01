import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DoctorStatus } from '../../domain/enums/doctor-status.enum';

export type DoctorDocument = DoctorSchemaClass & Document;

@Schema({ collection: 'doctors', timestamps: true })
export class DoctorSchemaClass {
  @Prop({ required: true, unique: true }) doctorId: string;
  @Prop({ required: true, unique: true }) userId: string;
  @Prop({ required: true, enum: DoctorStatus, default: DoctorStatus.PENDING_VERIFICATION }) status: DoctorStatus;
}

export const DoctorSchema = SchemaFactory.createForClass(DoctorSchemaClass);
