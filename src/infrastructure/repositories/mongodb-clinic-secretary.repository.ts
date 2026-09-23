import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClinicSecretaryRepository } from '../../domain/repositories/clinic-secretary.repository';
import { ClinicSecretaryEntity } from '../../domain/entities/clinic-secretary.entity';
import { ClinicSecretaryDocument, ClinicSecretarySchemaClass } from '../database/mongodb/schemas/clinic-secretary.schema';

@Injectable()
export class MongoClinicSecretaryRepository implements IClinicSecretaryRepository {
  constructor(@InjectModel(ClinicSecretarySchemaClass.name) private readonly clinicSecretaryModel: Model<ClinicSecretaryDocument>) {}
  async save(entity: ClinicSecretaryEntity): Promise<ClinicSecretaryEntity> {
    const created = await this.clinicSecretaryModel.create({
      associationId: entity.id, secretaryId: entity.secretaryId, clinicId: entity.clinicId, isActive: entity.isActive,
    });
    return this.toEntity(created);
  }
  async findBySecretaryAndClinic(secretaryId: string, clinicId: string): Promise<ClinicSecretaryEntity | null> {
    const doc = await this.clinicSecretaryModel.findOne({ secretaryId, clinicId }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findByClinicId(clinicId: string): Promise<ClinicSecretaryEntity[]> {
    const docs = await this.clinicSecretaryModel.find({ clinicId }).exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async delete(secretaryId: string, clinicId: string): Promise<boolean> {
    const result = await this.clinicSecretaryModel.deleteOne({ secretaryId, clinicId }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: ClinicSecretaryDocument): ClinicSecretaryEntity {
    return new ClinicSecretaryEntity({
      id: doc.associationId, secretaryId: doc.secretaryId, clinicId: doc.clinicId, isActive: doc.isActive, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
