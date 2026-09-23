import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository';
import { DoctorEntity } from '../../domain/entities/doctor.entity';
import { DoctorStatus } from '../../domain/enums/doctor-status.enum';
import { DoctorDocument, DoctorSchemaClass } from '../database/mongodb/schemas/doctor.schema';

@Injectable()
export class MongoDoctorRepository implements IDoctorRepository {
  constructor(@InjectModel(DoctorSchemaClass.name) private readonly doctorModel: Model<DoctorDocument>) {}
  async save(entity: DoctorEntity): Promise<DoctorEntity> {
    const created = await this.doctorModel.create({ doctorId: entity.id, userId: entity.userId, status: entity.status });
    return this.toEntity(created);
  }
  async findById(id: string): Promise<DoctorEntity | null> {
    const doc = await this.doctorModel.findOne({ doctorId: id }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findByUserId(userId: string): Promise<DoctorEntity | null> {
    const doc = await this.doctorModel.findOne({ userId }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findAll(): Promise<DoctorEntity[]> {
    const docs = await this.doctorModel.find().exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async update(entity: DoctorEntity): Promise<DoctorEntity> {
    const updatedDoc = await this.doctorModel.findOneAndUpdate({ doctorId: entity.id }, { status: entity.status }, { new: true }).exec();
    if (!updatedDoc) throw new Error('Doctor not found');
    return this.toEntity(updatedDoc);
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.doctorModel.deleteOne({ doctorId: id }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: DoctorDocument): DoctorEntity {
    return new DoctorEntity({ id: doc.doctorId, userId: doc.userId, status: doc.status as DoctorStatus, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt });
  }
}
