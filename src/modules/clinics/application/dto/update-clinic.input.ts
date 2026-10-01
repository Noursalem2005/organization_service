import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClinicInput {
  @ApiPropertyOptional({ description: 'Updated clinic name', example: 'Al-Amal Heliopolis Branch' })
  name?: string;

  @ApiPropertyOptional({ description: 'Updated phone number', example: '+201011223344' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Updated clinic address', example: 'Heliopolis, Cairo' })
  address?: string;

  @ApiPropertyOptional({ description: 'Clinic status', example: true })
  isActive?: boolean;
}
