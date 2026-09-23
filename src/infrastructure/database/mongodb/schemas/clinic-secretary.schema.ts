import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicSecretaryDocument = ClinicSecretarySchemaClass & Document;

@Schema({ collection: 'clinic_secretaries', timestamps: true })
export class ClinicSecretarySchemaClass {
  @Prop({ required: true, unique: true }) associationId: string;
  @Prop({ required: true, index: true }) secretaryId: string;
  @Prop({ required: true, index: true }) clinicId: string;
  @Prop({ default: true }) isActive: boolean;
}

export const ClinicSecretarySchema = SchemaFactory.createForClass(ClinicSecretarySchemaClass);
ClinicSecretarySchema.index({ secretaryId: 1, clinicId: 1 }, { unique: true });
