import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignClinicMemberInput {
  @ApiProperty({ description: 'User ID of the member' })
  userId: string;

  @ApiProperty({ description: 'Clinic ID' })
  clinicId: string;

  @ApiPropertyOptional({ description: 'Organization ID' })
  organizationId?: string;

  @ApiPropertyOptional({ description: 'User level / Role category (e.g. DOCTOR, SECRETARY, NURSE, CLINIC_ADMIN)', default: 'DOCTOR' })
  userLevel?: string;

  @ApiPropertyOptional({ type: [String], description: 'Assigned roles' })
  roles?: string[];

  @ApiPropertyOptional({ type: [String], description: 'Assigned granular permissions' })
  permissions?: string[];

  @ApiPropertyOptional({ description: 'Role-specific metadata (e.g. consultationFee, department, shift)' })
  roleMetadata?: Record<string, any>;

  @ApiPropertyOptional({ default: true })
  isActive?: boolean;
}
