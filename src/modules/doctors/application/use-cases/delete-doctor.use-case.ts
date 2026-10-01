import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorRepository, DOCTOR_REPOSITORY } from '../../domain/repositories/doctor.repository';
import { IDoctorProfileRepository, DOCTOR_PROFILE_REPOSITORY } from '../../domain/repositories/doctor-profile.repository';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: IDoctorRepository,
    @Inject(DOCTOR_PROFILE_REPOSITORY) private readonly profileRepository: IDoctorProfileRepository,
  ) {}
  async execute(doctorId: string): Promise<boolean> {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new NotFoundException(`Doctor with ID '${doctorId}' not found`);
    await this.profileRepository.delete(doctorId);
    return this.doctorRepository.delete(doctorId);
  }
}
