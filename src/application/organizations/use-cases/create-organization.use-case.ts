import { Inject, Injectable } from '@nestjs/common';
import { IOrganizationRepository, ORGANIZATION_REPOSITORY } from '../../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../../domain/entities/organization.entity';
import { OrganizationId } from '../../../domain/value-objects/organization-id.vo';
import { CreateOrganizationInput } from '../dto/create-organization.input';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(@Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: IOrganizationRepository) {}
  async execute(input: CreateOrganizationInput): Promise<OrganizationEntity> {
    const id = new OrganizationId(randomUUID());
    const entity = new OrganizationEntity({ id, name: input.name, type: input.type, email: input.email, phone: input.phone, address: input.address });
    return this.organizationRepository.save(entity);
  }
}
