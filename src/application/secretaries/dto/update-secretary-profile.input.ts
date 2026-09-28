import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSecretaryProfileInput {
  @ApiPropertyOptional({ description: 'First name', example: 'Mona' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name', example: 'Ali' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+201099887755' })
  phoneNumber?: string;
}
