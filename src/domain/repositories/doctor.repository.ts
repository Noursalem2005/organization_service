import { DoctorEntity } from '../entities/doctor.entity';

export interface IDoctorRepository {
  save(doctor: DoctorEntity): Promise<DoctorEntity>;
  findById(id: string): Promise<DoctorEntity | null>;
  findByUserId(userId: string): Promise<DoctorEntity | null>;
  findAll(): Promise<DoctorEntity[]>;
  update(doctor: DoctorEntity): Promise<DoctorEntity>;
  delete(id: string): Promise<boolean>;
}

export const DOCTOR_REPOSITORY = 'DOCTOR_REPOSITORY';
