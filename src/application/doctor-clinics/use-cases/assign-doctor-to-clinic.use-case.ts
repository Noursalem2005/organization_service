import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorClinicRepository, DOCTOR_CLINIC_REPOSITORY } from '../../../domain/repositories/doctor-clinic.repository';
import { IDoctorRepository, DOCTOR_REPOSITORY } from '../../../domain/repositories/doctor.repository';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../../domain/repositories/clinic.repository';
import { DoctorClinicEntity } from '../../../domain/entities/doctor-clinic.entity';
import { ClinicId } from '../../../domain/value-objects/clinic-id.vo';
import { AssignDoctorToClinicInput } from '../dto/assign-doctor-to-clinic.input';
import { randomUUID } from 'crypto';

@Injectable()
export class AssignDoctorToClinicUseCase {
  constructor(
    @Inject(DOCTOR_CLINIC_REPOSITORY) private readonly doctorClinicRepository: IDoctorClinicRepository,
    @Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: IDoctorRepository,
    @Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository,
  ) {}
  async execute(input: AssignDoctorToClinicInput): Promise<DoctorClinicEntity> {
    const doctor = await this.doctorRepository.findById(input.doctorId);
    if (!doctor) throw new NotFoundException(`Doctor with ID '${input.doctorId}' not found`);
    const clinic = await this.clinicRepository.findById(new ClinicId(input.clinicId));
    if (!clinic) throw new NotFoundException(`Clinic with ID '${input.clinicId}' not found`);
    const existing = await this.doctorClinicRepository.findByDoctorAndClinic(input.doctorId, input.clinicId);
    if (existing) throw new ConflictException(`Doctor '${input.doctorId}' is already assigned to clinic '${input.clinicId}'`);
    return this.doctorClinicRepository.save(new DoctorClinicEntity({ id: randomUUID(), doctorId: input.doctorId, clinicId: input.clinicId, consultationFee: input.consultationFee }));
  }
}
