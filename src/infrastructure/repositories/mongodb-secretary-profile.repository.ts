import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISecretaryProfileRepository } from '../../domain/repositories/secretary-profile.repository';
import { SecretaryProfileEntity } from '../../domain/entities/secretary-profile.entity';
import { PhoneNumber } from '../../domain/value-objects/phone-number.vo';
import { SecretaryProfileDocument, SecretaryProfileSchemaClass } from '../database/mongodb/schemas/secretary-profile.schema';

@Injectable()
export class MongoSecretaryProfileRepository implements ISecretaryProfileRepository {
  constructor(@InjectModel(SecretaryProfileSchemaClass.name) private readonly secretaryModel: Model<SecretaryProfileDocument>) {}
  async save(entity: SecretaryProfileEntity): Promise<SecretaryProfileEntity> {
    const created = await this.secretaryModel.create({
      secretaryId: entity.id, userId: entity.userId, firstName: entity.firstName, lastName: entity.lastName, phoneNumber: entity.phoneNumber?.getValue(),
    });
    return this.toEntity(created);
  }
  async findById(id: string): Promise<SecretaryProfileEntity | null> {
    const doc = await this.secretaryModel.findOne({ secretaryId: id }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findByUserId(userId: string): Promise<SecretaryProfileEntity | null> {
    const doc = await this.secretaryModel.findOne({ userId }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async update(entity: SecretaryProfileEntity): Promise<SecretaryProfileEntity> {
    const updatedDoc = await this.secretaryModel.findOneAndUpdate(
      { secretaryId: entity.id },
      { firstName: entity.firstName, lastName: entity.lastName, phoneNumber: entity.phoneNumber?.getValue() },
      { new: true },
    ).exec();
    if (!updatedDoc) throw new Error('Secretary Profile not found');
    return this.toEntity(updatedDoc);
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.secretaryModel.deleteOne({ secretaryId: id }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: SecretaryProfileDocument): SecretaryProfileEntity {
    return new SecretaryProfileEntity({
      id: doc.secretaryId, userId: doc.userId, firstName: doc.firstName, lastName: doc.lastName, phoneNumber: doc.phoneNumber ? new PhoneNumber(doc.phoneNumber) : undefined, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
