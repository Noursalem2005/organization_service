import { OrganizationType } from '../../../domain/enums/organization-type.enum';
export class CreateOrganizationInput {
  name: string;
  type: OrganizationType;
  email?: string;
  phone?: string;
  address?: string;
}
