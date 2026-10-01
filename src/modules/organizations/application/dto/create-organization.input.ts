import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationType } from '../../domain/enums/organization-type.enum';

export class CreateOrganizationInput {
  @ApiProperty({ description: 'Name of the organization', example: 'Al-Amal Dental Center' })
  name: string;

  @ApiProperty({ enum: OrganizationType, description: 'Type of organization', example: OrganizationType.CLINIC_CENTER })
  type: OrganizationType;

  @ApiPropertyOptional({ description: 'Contact email address', example: 'contact@alamal.com' })
  email?: string;

  @ApiPropertyOptional({ description: 'Contact phone number', example: '+201012345678' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Physical address of headquarters', example: 'Cairo, Egypt' })
  address?: string;
}
