import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicMemberDocument = ClinicMemberSchema & Document;

@Schema({ timestamps: true, collection: 'clinic_members' })
export class ClinicMemberSchema {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  clinicId: string;

  @Prop({ required: true, default: '' })
  organizationId: string;

  @Prop({ required: true, default: 'DOCTOR' })
  userLevel: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object, default: {} })
  roleMetadata: Record<string, any>;
}

export const ClinicMemberMongoSchema = SchemaFactory.createForClass(ClinicMemberSchema);
ClinicMemberMongoSchema.index({ userId: 1, clinicId: 1 }, { unique: true });
