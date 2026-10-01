import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SecretaryProfileDocument = SecretaryProfileSchemaClass & Document;

@Schema({ collection: 'secretary_profiles', timestamps: true })
export class SecretaryProfileSchemaClass {
  @Prop({ required: true, unique: true }) secretaryId: string;
  @Prop({ required: true, unique: true }) userId: string;
  @Prop({ type: String, unique: true, index: true }) employeeCode?: string;
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop() phoneNumber?: string;
  @Prop({ default: true }) isActive: boolean;
}

export const SecretaryProfileSchema = SchemaFactory.createForClass(SecretaryProfileSchemaClass);

SecretaryProfileSchema.pre('save', function (this: any) {
  if (!this.employeeCode && this._id) {
    this.employeeCode = `SEC-${this._id.toString()}`;
  }
});
