import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrganizationType } from '../../../../domain/enums/organization-type.enum';

export type OrganizationDocument = OrganizationSchemaClass & Document;

@Schema({ collection: 'organizations', timestamps: true })
export class OrganizationSchemaClass {
  @Prop({ required: true, unique: true }) organizationId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, enum: OrganizationType }) type: OrganizationType;
  @Prop() email?: string;
  @Prop() phone?: string;
  @Prop() address?: string;
  @Prop({ default: true }) isActive: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(OrganizationSchemaClass);
