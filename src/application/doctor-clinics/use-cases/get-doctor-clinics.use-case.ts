import { Inject, Injectable } from '@nestjs/common';
import { IDoctorClinicRepository, DOCTOR_CLINIC_REPOSITORY } from '../../../domain/repositories/doctor-clinic.repository';
import { DoctorClinicEntity } from '../../../domain/entities/doctor-clinic.entity';

@Injectable()
export class GetDoctorClinicsUseCase {
  constructor(@Inject(DOCTOR_CLINIC_REPOSITORY) private readonly doctorClinicRepository: IDoctorClinicRepository) {}
  async execute(doctorId: string): Promise<DoctorClinicEntity[]> {
    return this.doctorClinicRepository.findByDoctorId(doctorId);
  }
}
