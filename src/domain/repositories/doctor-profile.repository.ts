import { DoctorProfileEntity } from '../entities/doctor-profile.entity';

export interface IDoctorProfileRepository {
  save(profile: DoctorProfileEntity): Promise<DoctorProfileEntity>;
  findByDoctorId(doctorId: string): Promise<DoctorProfileEntity | null>;
  update(profile: DoctorProfileEntity): Promise<DoctorProfileEntity>;
  delete(doctorId: string): Promise<boolean>;
}

export const DOCTOR_PROFILE_REPOSITORY = 'DOCTOR_PROFILE_REPOSITORY';
