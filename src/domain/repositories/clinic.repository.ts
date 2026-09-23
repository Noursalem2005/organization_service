import { ClinicEntity } from '../entities/clinic.entity';
import { ClinicId } from '../value-objects/clinic-id.vo';
import { OrganizationId } from '../value-objects/organization-id.vo';

export interface IClinicRepository {
  save(clinic: ClinicEntity): Promise<ClinicEntity>;
  findById(id: ClinicId): Promise<ClinicEntity | null>;
  findByOrganizationId(organizationId: OrganizationId): Promise<ClinicEntity[]>;
  update(clinic: ClinicEntity): Promise<ClinicEntity>;
  delete(id: ClinicId): Promise<boolean>;
}

export const CLINIC_REPOSITORY = 'CLINIC_REPOSITORY';
