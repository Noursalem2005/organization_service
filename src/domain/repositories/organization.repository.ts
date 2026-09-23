import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationId } from '../value-objects/organization-id.vo';

export interface IOrganizationRepository {
  save(organization: OrganizationEntity): Promise<OrganizationEntity>;
  findById(id: OrganizationId): Promise<OrganizationEntity | null>;
  findAll(): Promise<OrganizationEntity[]>;
  update(organization: OrganizationEntity): Promise<OrganizationEntity>;
  delete(id: OrganizationId): Promise<boolean>;
}

export const ORGANIZATION_REPOSITORY = 'ORGANIZATION_REPOSITORY';
