import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ISecretaryProfileRepository, SECRETARY_PROFILE_REPOSITORY } from '../../../domain/repositories/secretary-profile.repository';
import { SecretaryProfileEntity } from '../../../domain/entities/secretary-profile.entity';
import { PhoneNumber } from '../../../domain/value-objects/phone-number.vo';
import { CreateSecretaryProfileInput } from '../dto/create-secretary-profile.input';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateSecretaryProfileUseCase {
  constructor(@Inject(SECRETARY_PROFILE_REPOSITORY) private readonly repository: ISecretaryProfileRepository) {}
  async execute(input: CreateSecretaryProfileInput): Promise<SecretaryProfileEntity> {
    const existing = await this.repository.findByUserId(input.userId);
    if (existing) throw new ConflictException(`Secretary profile already exists for user ID '${input.userId}'`);
    return this.repository.save(new SecretaryProfileEntity({
      id: randomUUID(), userId: input.userId, firstName: input.firstName, lastName: input.lastName, phoneNumber: input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined,
    }));
  }
}
