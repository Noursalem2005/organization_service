import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationType } from '../../../domain/enums/organization-type.enum';

export class UpdateOrganizationInput {
  @ApiPropertyOptional({ description: 'Updated name of the organization', example: 'Al-Amal Dental Network' })
  name?: string;

  @ApiPropertyOptional({ enum: OrganizationType, description: 'Type of organization', example: OrganizationType.CLINIC_CENTER })
  type?: OrganizationType;

  @ApiPropertyOptional({ description: 'Updated email address', example: 'info@alamal.com' })
  email?: string;

  @ApiPropertyOptional({ description: 'Updated phone number', example: '+201099887766' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Updated address', example: 'Giza, Egypt' })
  address?: string;

  @ApiPropertyOptional({ description: 'Active status of the organization', example: true })
  isActive?: boolean;
}
