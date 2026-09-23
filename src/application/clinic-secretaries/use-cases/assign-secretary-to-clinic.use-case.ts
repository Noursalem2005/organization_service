import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicSecretaryRepository, CLINIC_SECRETARY_REPOSITORY } from '../../../domain/repositories/clinic-secretary.repository';
import { ISecretaryProfileRepository, SECRETARY_PROFILE_REPOSITORY } from '../../../domain/repositories/secretary-profile.repository';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../../domain/repositories/clinic.repository';
import { ClinicSecretaryEntity } from '../../../domain/entities/clinic-secretary.entity';
import { ClinicId } from '../../../domain/value-objects/clinic-id.vo';
import { AssignSecretaryToClinicInput } from '../dto/assign-secretary-to-clinic.input';
import { randomUUID } from 'crypto';

@Injectable()
export class AssignSecretaryToClinicUseCase {
  constructor(
    @Inject(CLINIC_SECRETARY_REPOSITORY) private readonly repository: IClinicSecretaryRepository,
    @Inject(SECRETARY_PROFILE_REPOSITORY) private readonly secretaryRepository: ISecretaryProfileRepository,
    @Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository,
  ) {}
  async execute(input: AssignSecretaryToClinicInput): Promise<ClinicSecretaryEntity> {
    const secretary = await this.secretaryRepository.findById(input.secretaryId);
    if (!secretary) throw new NotFoundException(`Secretary with ID '${input.secretaryId}' not found`);
    const clinic = await this.clinicRepository.findById(new ClinicId(input.clinicId));
    if (!clinic) throw new NotFoundException(`Clinic with ID '${input.clinicId}' not found`);
    const existing = await this.repository.findBySecretaryAndClinic(input.secretaryId, input.clinicId);
    if (existing) throw new ConflictException(`Secretary '${input.secretaryId}' is already assigned to clinic '${input.clinicId}'`);
    return this.repository.save(new ClinicSecretaryEntity({ id: randomUUID(), secretaryId: input.secretaryId, clinicId: input.clinicId }));
  }
}
