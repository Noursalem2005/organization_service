import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository, ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { OrganizationId } from '../../../../core/domain/value-objects/organization-id.vo';

@Injectable()
export class GetOrganizationUseCase {
  constructor(@Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: IOrganizationRepository) {}
  async execute(idString: string): Promise<OrganizationEntity> {
    const id = new OrganizationId(idString);
    const org = await this.organizationRepository.findById(id);
    if (!org) throw new NotFoundException(`Organization with ID '${idString}' not found`);
    return org;
  }
}
