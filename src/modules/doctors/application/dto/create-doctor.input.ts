import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorInput {
  @ApiProperty({ description: 'User ID associated with the doctor', example: 'usr_99887766' })
  userId: string;

  @ApiProperty({ description: 'First name', example: 'Ahmed' })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Hassan' })
  lastName: string;

  @ApiProperty({ description: 'Doctor medical specialty', example: 'Orthodontics' })
  specialty: string;

  @ApiPropertyOptional({ description: 'Sub-specialty if applicable', example: 'Pediatric Orthodontics' })
  subSpecialty?: string;

  @ApiProperty({ description: 'Medical license number', example: 'LIC-998877' })
  licenseNumber: string;

  @ApiPropertyOptional({ description: 'Short bio / description', example: 'Specialist in dental alignment and braces.' })
  bio?: string;

  @ApiPropertyOptional({ description: 'Direct contact phone number', example: '+201011223344' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Years of clinical experience', example: 8 })
  yearsOfExperience?: number;
}
