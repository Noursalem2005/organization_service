import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorRepository, DOCTOR_REPOSITORY } from '../../../domain/repositories/doctor.repository';
import { IDoctorProfileRepository, DOCTOR_PROFILE_REPOSITORY } from '../../../domain/repositories/doctor-profile.repository';
import { DoctorEntity } from '../../../domain/entities/doctor.entity';
import { DoctorProfileEntity } from '../../../domain/entities/doctor-profile.entity';

@Injectable()
export class GetDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: IDoctorRepository,
    @Inject(DOCTOR_PROFILE_REPOSITORY) private readonly profileRepository: IDoctorProfileRepository,
  ) {}
  async execute(doctorId: string): Promise<{ doctor: DoctorEntity; profile: DoctorProfileEntity | null }> {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new NotFoundException(`Doctor with ID '${doctorId}' not found`);
    const profile = await this.profileRepository.findByDoctorId(doctorId);
    return { doctor, profile };
  }
}
