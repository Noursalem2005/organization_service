import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicDocument = ClinicSchemaClass & Document;

@Schema({ collection: 'clinics', timestamps: true })
export class ClinicSchemaClass {
  @Prop({ required: true, unique: true }) clinicId: string;
  @Prop({ required: true, index: true }) organizationId: string;
  @Prop({ required: true }) name: string;
  @Prop() phone?: string;
  @Prop() address?: string;
  @Prop({ default: true }) isActive: boolean;
}

export const ClinicSchema = SchemaFactory.createForClass(ClinicSchemaClass);
