import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository, ORGANIZATION_REPOSITORY } from '../../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../../domain/entities/organization.entity';
import { OrganizationId } from '../../../domain/value-objects/organization-id.vo';
import { UpdateOrganizationInput } from '../dto/update-organization.input';

@Injectable()
export class UpdateOrganizationUseCase {
  constructor(@Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: IOrganizationRepository) {}
  async execute(idString: string, input: UpdateOrganizationInput): Promise<OrganizationEntity> {
    const id = new OrganizationId(idString);
    const org = await this.organizationRepository.findById(id);
    if (!org) throw new NotFoundException(`Organization with ID '${idString}' not found`);
    org.updateDetails({ name: input.name, type: input.type, email: input.email, phone: input.phone, address: input.address });
    if (input.isActive === true) org.activate();
    else if (input.isActive === false) org.deactivate();
    return this.organizationRepository.update(org);
  }
}
