import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDoctorClinicRepository } from '../../domain/repositories/doctor-clinic.repository';
import { DoctorClinicEntity } from '../../domain/entities/doctor-clinic.entity';
import { DoctorClinicDocument, DoctorClinicSchemaClass } from '../database/mongodb/schemas/doctor-clinic.schema';

@Injectable()
export class MongoDoctorClinicRepository implements IDoctorClinicRepository {
  constructor(@InjectModel(DoctorClinicSchemaClass.name) private readonly doctorClinicModel: Model<DoctorClinicDocument>) {}
  async save(entity: DoctorClinicEntity): Promise<DoctorClinicEntity> {
    const created = await this.doctorClinicModel.create({
      associationId: entity.id, doctorId: entity.doctorId, clinicId: entity.clinicId, consultationFee: entity.consultationFee, isActive: entity.isActive,
    });
    return this.toEntity(created);
  }
  async findByDoctorAndClinic(doctorId: string, clinicId: string): Promise<DoctorClinicEntity | null> {
    const doc = await this.doctorClinicModel.findOne({ doctorId, clinicId }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async findByDoctorId(doctorId: string): Promise<DoctorClinicEntity[]> {
    const docs = await this.doctorClinicModel.find({ doctorId }).exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async findByClinicId(clinicId: string): Promise<DoctorClinicEntity[]> {
    const docs = await this.doctorClinicModel.find({ clinicId }).exec();
    return docs.map((doc) => this.toEntity(doc));
  }
  async delete(doctorId: string, clinicId: string): Promise<boolean> {
    const result = await this.doctorClinicModel.deleteOne({ doctorId, clinicId }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: DoctorClinicDocument): DoctorClinicEntity {
    return new DoctorClinicEntity({
      id: doc.associationId, doctorId: doc.doctorId, clinicId: doc.clinicId, consultationFee: doc.consultationFee, isActive: doc.isActive, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
