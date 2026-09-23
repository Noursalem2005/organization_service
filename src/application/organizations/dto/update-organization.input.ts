import { OrganizationType } from '../../../domain/enums/organization-type.enum';
export class UpdateOrganizationInput {
  name?: string;
  type?: OrganizationType;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}
