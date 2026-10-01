import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSecretaryProfileInput {
  @ApiProperty({ description: 'User ID associated with the secretary', example: 'usr_55443322' })
  userId: string;

  @ApiProperty({ description: 'First name', example: 'Mona' })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Ali' })
  lastName: string;

  @ApiPropertyOptional({ description: 'Contact phone number', example: '+201099887755' })
  phoneNumber?: string;
}
