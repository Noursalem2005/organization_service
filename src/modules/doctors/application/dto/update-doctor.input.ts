import { ApiPropertyOptional } from '@nestjs/swagger';
import { DoctorStatus } from '../../domain/enums/doctor-status.enum';

export class UpdateDoctorInput {
  @ApiPropertyOptional({ enum: DoctorStatus, description: 'Doctor verification status', example: DoctorStatus.ACTIVE })
  status?: DoctorStatus;

  @ApiPropertyOptional({ description: 'First name', example: 'Ahmed' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name', example: 'Hassan' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Specialty', example: 'Orthodontics' })
  specialty?: string;

  @ApiPropertyOptional({ description: 'Sub-specialty', example: 'Pediatric Orthodontics' })
  subSpecialty?: string;

  @ApiPropertyOptional({ description: 'Medical license number', example: 'LIC-998877' })
  licenseNumber?: string;

  @ApiPropertyOptional({ description: 'Bio', example: 'Updated bio details.' })
  bio?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+201011223344' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Years of experience', example: 10 })
  yearsOfExperience?: number;
}
