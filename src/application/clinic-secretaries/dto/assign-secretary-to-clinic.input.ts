import { ApiProperty } from '@nestjs/swagger';

export class AssignSecretaryToClinicInput {
  @ApiProperty({ description: 'Secretary Profile ID', example: 'sec_112233' })
  secretaryId: string;

  @ApiProperty({ description: 'Clinic ID', example: 'clinic_98765' })
  clinicId: string;
}
