import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClinicInput {
  @ApiProperty({ description: 'Parent organization ID', example: 'org_65a1b2c3d4e5' })
  organizationId: string;

  @ApiProperty({ description: 'Clinic branch name', example: 'Al-Amal Nasr City Branch' })
  name: string;

  @ApiPropertyOptional({ description: 'Clinic phone number', example: '+201098765432' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Physical address of the clinic', example: 'Nasr City, Cairo' })
  address?: string;
}
