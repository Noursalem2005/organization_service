import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../domain/repositories/clinic.repository';
import { IOrganizationRepository, ORGANIZATION_REPOSITORY } from '../../../organizations/domain/repositories/organization.repository';
import { ClinicEntity } from '../../domain/entities/clinic.entity';
import { ClinicId } from '../../../../core/domain/value-objects/clinic-id.vo';
import { OrganizationId } from '../../../../core/domain/value-objects/organization-id.vo';
import { CreateClinicInput } from '../dto/create-clinic.input';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateClinicUseCase {
  constructor(
    @Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository,
    @Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: IOrganizationRepository,
  ) {}
  async execute(input: CreateClinicInput): Promise<ClinicEntity> {
    const orgId = new OrganizationId(input.organizationId);
    const org = await this.organizationRepository.findById(orgId);
    if (!org) throw new NotFoundException(`Organization with ID '${input.organizationId}' not found`);
    const entity = new ClinicEntity({ id: new ClinicId(randomUUID()), organizationId: orgId, name: input.name, phone: input.phone, address: input.address });
    return this.clinicRepository.save(entity);
  }
}
