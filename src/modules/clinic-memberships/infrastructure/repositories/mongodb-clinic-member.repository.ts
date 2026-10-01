import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClinicMember } from '../../domain/entities/clinic-member.entity';
import { IClinicMemberRepository } from '../../domain/repositories/clinic-member.repository';
import { ClinicMemberDocument, ClinicMemberSchema } from '../schemas/clinic-member.schema';

@Injectable()
export class MongoClinicMemberRepository implements IClinicMemberRepository {
  constructor(
    @InjectModel(ClinicMemberSchema.name)
    private readonly model: Model<ClinicMemberDocument>,
  ) {}

  async save(member: ClinicMember): Promise<ClinicMember> {
    const doc = await this.model.findOneAndUpdate(
      { userId: member.userId, clinicId: member.clinicId },
      {
        organizationId: member.organizationId || '',
        userLevel: member.userLevel || 'DOCTOR',
        roles: member.roles || [],
        permissions: member.permissions || [],
        isActive: member.isActive !== false,
        roleMetadata: member.roleMetadata || {},
      },
      { upsert: true, new: true },
    );
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<ClinicMember | null> {
    const doc = await this.model.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async findByUserAndClinic(userId: string, clinicId: string): Promise<ClinicMember | null> {
    const doc = await this.model.findOne({ userId, clinicId });
    return doc ? this.toEntity(doc) : null;
  }

  async findByClinic(clinicId: string, userLevel?: string): Promise<ClinicMember[]> {
    const query: any = { clinicId, isActive: true };
    if (userLevel) {
      query.userLevel = userLevel;
    }
    const docs = await this.model.find(query);
    return docs.map((d) => this.toEntity(d));
  }

  async findByUser(userId: string): Promise<ClinicMember[]> {
    const docs = await this.model.find({ userId, isActive: true });
    return docs.map((d) => this.toEntity(d));
  }

  async delete(userId: string, clinicId: string): Promise<boolean> {
    const res = await this.model.deleteOne({ userId, clinicId });
    return res.deletedCount > 0;
  }

  private toEntity(doc: ClinicMemberDocument): ClinicMember {
    return new ClinicMember(
      doc._id.toString(),
      doc.userId,
      doc.clinicId,
      doc.organizationId || '',
      doc.userLevel || 'DOCTOR',
      doc.roles || [],
      doc.permissions || [],
      doc.isActive,
      doc.roleMetadata || {},
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }
}
