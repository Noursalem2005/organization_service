import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository, ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository';
import { OrganizationId } from '../../../../core/domain/value-objects/organization-id.vo';

@Injectable()
export class DeleteOrganizationUseCase {
  constructor(@Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: IOrganizationRepository) {}
  async execute(idString: string): Promise<boolean> {
    const id = new OrganizationId(idString);
    const existing = await this.organizationRepository.findById(id);
    if (!existing) throw new NotFoundException(`Organization with ID '${idString}' not found`);
    return this.organizationRepository.delete(id);
  }
}
