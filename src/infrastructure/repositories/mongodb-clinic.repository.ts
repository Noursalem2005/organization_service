import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClinicRepository } from '../../domain/repositories/clinic.repository';
import { ClinicEntity } from '../../domain/entities/clinic.entity';
import { ClinicId } from '../../domain/value-objects/clinic-id.vo';
import { OrganizationId } from '../../domain/value-objects/organization-id.vo';
import { ClinicDocument, ClinicSchemaClass } from '../database/mongodb/schemas/clinic.schema';

@Injectable()
export class MongoClinicRepository implements IClinicRepository {
  constructor(@InjectModel(ClinicSchemaClass.name) private readonly clinicModel: Model<ClinicDocument>) {}
  async save(entity: ClinicEntity): Promise<ClinicEntity> {
    const created = await this.clinicModel.create({
      clinicId: entity.id.getValue(), organizationId: entity.organizationId.getValue(), name: entity.name, phone: entity.phone, address: entity.address, isActive: entity.isActive,
    });
    return this.toEntity(created);
  }
  async findById(id: ClinicId): Promise<ClinicEntity | null> {
    const doc = await this.clinicModel.findOne({ clinicId: id.getValue() }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findByOrganizationId(organizationId: OrganizationId): Promise<ClinicEntity[]> {
    const docs = await this.clinicModel.find({ organizationId: organizationId.getValue() }).exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async update(entity: ClinicEntity): Promise<ClinicEntity> {
    const updatedDoc = await this.clinicModel.findOneAndUpdate(
      { clinicId: entity.id.getValue() },
      { name: entity.name, phone: entity.phone, address: entity.address, isActive: entity.isActive },
      { new: true },
    ).exec();
    if (!updatedDoc) throw new Error('Clinic not found');
    return this.toEntity(updatedDoc);
  }
  async delete(id: ClinicId): Promise<boolean> {
    const result = await this.clinicModel.deleteOne({ clinicId: id.getValue() }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: ClinicDocument): ClinicEntity {
    return new ClinicEntity({
      id: new ClinicId(doc.clinicId), organizationId: new OrganizationId(doc.organizationId), name: doc.name, phone: doc.phone, address: doc.address, isActive: doc.isActive, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
