import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IDoctorRepository, DOCTOR_REPOSITORY } from '../../domain/repositories/doctor.repository';
import { IDoctorProfileRepository, DOCTOR_PROFILE_REPOSITORY } from '../../domain/repositories/doctor-profile.repository';
import { DoctorEntity } from '../../domain/entities/doctor.entity';
import { DoctorProfileEntity } from '../../domain/entities/doctor-profile.entity';
import { PhoneNumber } from '../../../../core/domain/value-objects/phone-number.vo';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: IDoctorRepository,
    @Inject(DOCTOR_PROFILE_REPOSITORY) private readonly profileRepository: IDoctorProfileRepository,
  ) {}
  async execute(input: CreateDoctorInput): Promise<{ doctor: DoctorEntity; profile: DoctorProfileEntity }> {
    const existing = await this.doctorRepository.findByUserId(input.userId);
    if (existing) throw new ConflictException(`Doctor account already exists for user ID '${input.userId}'`);
    const doctorId = randomUUID();
    const doctor = await this.doctorRepository.save(new DoctorEntity({ id: doctorId, userId: input.userId }));
    const profile = await this.profileRepository.save(new DoctorProfileEntity({
      doctorId, firstName: input.firstName, lastName: input.lastName, specialty: input.specialty, subSpecialty: input.subSpecialty, licenseNumber: input.licenseNumber, bio: input.bio, phoneNumber: input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined, yearsOfExperience: input.yearsOfExperience,
    }));
    return { doctor, profile };
  }
}
