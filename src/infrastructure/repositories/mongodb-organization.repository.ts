import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { OrganizationId } from '../../domain/value-objects/organization-id.vo';
import { OrganizationType } from '../../domain/enums/organization-type.enum';
import { OrganizationDocument, OrganizationSchemaClass } from '../database/mongodb/schemas/organization.schema';

@Injectable()
export class MongoOrganizationRepository implements IOrganizationRepository {
  constructor(@InjectModel(OrganizationSchemaClass.name) private readonly organizationModel: Model<OrganizationDocument>) {}
  async save(entity: OrganizationEntity): Promise<OrganizationEntity> {
    const created = await this.organizationModel.create({
      organizationId: entity.id.getValue(), name: entity.name, type: entity.type, email: entity.email, phone: entity.phone, address: entity.address, isActive: entity.isActive,
    });
    return this.toEntity(created);
  }
  async findById(id: OrganizationId): Promise<OrganizationEntity | null> {
    const doc = await this.organizationModel.findOne({ organizationId: id.getValue() }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findAll(): Promise<OrganizationEntity[]> {
    const docs = await this.organizationModel.find().exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async update(entity: OrganizationEntity): Promise<OrganizationEntity> {
    const updatedDoc = await this.organizationModel.findOneAndUpdate(
      { organizationId: entity.id.getValue() },
      { name: entity.name, type: entity.type, email: entity.email, phone: entity.phone, address: entity.address, isActive: entity.isActive },
      { new: true },
    ).exec();
    if (!updatedDoc) throw new Error('Organization not found');
    return this.toEntity(updatedDoc);
  }
  async delete(id: OrganizationId): Promise<boolean> {
    const result = await this.organizationModel.deleteOne({ organizationId: id.getValue() }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: OrganizationDocument): OrganizationEntity {
    return new OrganizationEntity({
      id: new OrganizationId(doc.organizationId), name: doc.name, type: doc.type as OrganizationType, email: doc.email, phone: doc.phone, address: doc.address, isActive: doc.isActive, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
