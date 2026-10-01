import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorRepository, DOCTOR_REPOSITORY } from '../../domain/repositories/doctor.repository';
import { IDoctorProfileRepository, DOCTOR_PROFILE_REPOSITORY } from '../../domain/repositories/doctor-profile.repository';
import { DoctorEntity } from '../../domain/entities/doctor.entity';
import { DoctorProfileEntity } from '../../domain/entities/doctor-profile.entity';
import { DoctorStatus } from '../../domain/enums/doctor-status.enum';
import { PhoneNumber } from '../../../../core/domain/value-objects/phone-number.vo';
import { UpdateDoctorInput } from '../dto/update-doctor.input';

@Injectable()
export class UpdateDoctorUseCase {
  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: IDoctorRepository,
    @Inject(DOCTOR_PROFILE_REPOSITORY) private readonly profileRepository: IDoctorProfileRepository,
  ) {}
  async execute(doctorId: string, input: UpdateDoctorInput): Promise<{ doctor: DoctorEntity; profile: DoctorProfileEntity }> {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new NotFoundException(`Doctor with ID '${doctorId}' not found`);
    if (input.status === DoctorStatus.ACTIVE) doctor.activate();
    else if (input.status === DoctorStatus.INACTIVE) doctor.deactivate();
    else if (input.status === DoctorStatus.SUSPENDED) doctor.suspend();
    const updatedDoctor = await this.doctorRepository.update(doctor);

    let profile = await this.profileRepository.findByDoctorId(doctorId);
    if (profile) {
      profile.updateProfile({
        firstName: input.firstName, lastName: input.lastName, specialty: input.specialty, subSpecialty: input.subSpecialty, licenseNumber: input.licenseNumber, bio: input.bio, phoneNumber: input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined, yearsOfExperience: input.yearsOfExperience,
      });
      profile = await this.profileRepository.update(profile);
    } else {
      profile = await this.profileRepository.save(new DoctorProfileEntity({
        doctorId, firstName: input.firstName ?? '', lastName: input.lastName ?? '', specialty: input.specialty ?? '', licenseNumber: input.licenseNumber ?? '', subSpecialty: input.subSpecialty, bio: input.bio, phoneNumber: input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined, yearsOfExperience: input.yearsOfExperience,
      }));
    }
    return { doctor: updatedDoctor, profile };
  }
}
