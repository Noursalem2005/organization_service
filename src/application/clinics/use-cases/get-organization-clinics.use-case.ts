import { Inject, Injectable } from '@nestjs/common';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../../domain/repositories/clinic.repository';
import { ClinicEntity } from '../../../domain/entities/clinic.entity';
import { OrganizationId } from '../../../domain/value-objects/organization-id.vo';

@Injectable()
export class GetOrganizationClinicsUseCase {
  constructor(@Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository) {}
  async execute(organizationIdString: string): Promise<ClinicEntity[]> {
    return this.clinicRepository.findByOrganizationId(new OrganizationId(organizationIdString));
  }
}
