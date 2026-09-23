import { DoctorClinicEntity } from '../entities/doctor-clinic.entity';

export interface IDoctorClinicRepository {
  save(association: DoctorClinicEntity): Promise<DoctorClinicEntity>;
  findByDoctorAndClinic(doctorId: string, clinicId: string): Promise<DoctorClinicEntity | null>;
  findByDoctorId(doctorId: string): Promise<DoctorClinicEntity[]>;
  findByClinicId(clinicId: string): Promise<DoctorClinicEntity[]>;
  delete(doctorId: string, clinicId: string): Promise<boolean>;
}

export const DOCTOR_CLINIC_REPOSITORY = 'DOCTOR_CLINIC_REPOSITORY';
