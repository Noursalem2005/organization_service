import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorClinicRepository, DOCTOR_CLINIC_REPOSITORY } from '../../../domain/repositories/doctor-clinic.repository';

@Injectable()
export class RemoveDoctorFromClinicUseCase {
  constructor(@Inject(DOCTOR_CLINIC_REPOSITORY) private readonly doctorClinicRepository: IDoctorClinicRepository) {}
  async execute(doctorId: string, clinicId: string): Promise<boolean> {
    const existing = await this.doctorClinicRepository.findByDoctorAndClinic(doctorId, clinicId);
    if (!existing) throw new NotFoundException(`Association between Doctor '${doctorId}' and Clinic '${clinicId}' not found`);
    return this.doctorClinicRepository.delete(doctorId, clinicId);
  }
}
