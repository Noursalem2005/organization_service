import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignDoctorToClinicInput {
  @ApiProperty({ description: 'Doctor ID', example: 'doc_12345' })
  doctorId: string;

  @ApiProperty({ description: 'Clinic ID', example: 'clinic_98765' })
  clinicId: string;

  @ApiPropertyOptional({ description: 'Consultation fee for this clinic in EGP/USD', example: 350 })
  consultationFee?: number;
}
