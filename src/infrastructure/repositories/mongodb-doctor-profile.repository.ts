import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDoctorProfileRepository } from '../../domain/repositories/doctor-profile.repository';
import { DoctorProfileEntity } from '../../domain/entities/doctor-profile.entity';
import { PhoneNumber } from '../../domain/value-objects/phone-number.vo';
import { DoctorProfileDocument, DoctorProfileSchemaClass } from '../database/mongodb/schemas/doctor-profile.schema';

@Injectable()
export class MongoDoctorProfileRepository implements IDoctorProfileRepository {
  constructor(@InjectModel(DoctorProfileSchemaClass.name) private readonly profileModel: Model<DoctorProfileDocument>) {}
  async save(entity: DoctorProfileEntity): Promise<DoctorProfileEntity> {
    const created = await this.profileModel.create({
      doctorId: entity.doctorId, firstName: entity.firstName, lastName: entity.lastName, specialty: entity.specialty, subSpecialty: entity.subSpecialty, licenseNumber: entity.licenseNumber, bio: entity.bio, phoneNumber: entity.phoneNumber?.getValue(), yearsOfExperience: entity.yearsOfExperience,
    });
    return this.toEntity(created);
  }
  async findByDoctorId(doctorId: string): Promise<DoctorProfileEntity | null> {
    const doc = await this.profileModel.findOne({ doctorId }).exec();
    return doc ? this.toEntity(doc) : null;
  }
  async update(entity: DoctorProfileEntity): Promise<DoctorProfileEntity> {
    const updatedDoc = await this.profileModel.findOneAndUpdate(
      { doctorId: entity.doctorId },
      { firstName: entity.firstName, lastName: entity.lastName, specialty: entity.specialty, subSpecialty: entity.subSpecialty, licenseNumber: entity.licenseNumber, bio: entity.bio, phoneNumber: entity.phoneNumber?.getValue(), yearsOfExperience: entity.yearsOfExperience },
      { new: true },
    ).exec();
    if (!updatedDoc) throw new Error('Doctor Profile not found');
    return this.toEntity(updatedDoc);
  }
  async delete(doctorId: string): Promise<boolean> {
    const result = await this.profileModel.deleteOne({ doctorId }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
  private toEntity(doc: DoctorProfileDocument): DoctorProfileEntity {
    return new DoctorProfileEntity({
      doctorId: doc.doctorId, firstName: doc.firstName, lastName: doc.lastName, specialty: doc.specialty, subSpecialty: doc.subSpecialty, licenseNumber: doc.licenseNumber, bio: doc.bio, phoneNumber: doc.phoneNumber ? new PhoneNumber(doc.phoneNumber) : undefined, yearsOfExperience: doc.yearsOfExperience, createdAt: (doc as any).createdAt, updatedAt: (doc as any).updatedAt,
    });
  }
}
