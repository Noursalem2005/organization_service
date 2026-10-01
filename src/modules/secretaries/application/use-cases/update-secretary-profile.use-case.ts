import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISecretaryProfileRepository, SECRETARY_PROFILE_REPOSITORY } from '../../domain/repositories/secretary-profile.repository';
import { SecretaryProfileEntity } from '../../domain/entities/secretary-profile.entity';
import { PhoneNumber } from '../../../../core/domain/value-objects/phone-number.vo';
import { UpdateSecretaryProfileInput } from '../dto/update-secretary-profile.input';

@Injectable()
export class UpdateSecretaryProfileUseCase {
  constructor(@Inject(SECRETARY_PROFILE_REPOSITORY) private readonly repository: ISecretaryProfileRepository) {}
  async execute(id: string, input: UpdateSecretaryProfileInput): Promise<SecretaryProfileEntity> {
    const profile = await this.repository.findById(id);
    if (!profile) throw new NotFoundException(`Secretary Profile with ID '${id}' not found`);
    profile.update({
      firstName: input.firstName, lastName: input.lastName, phoneNumber: input.phoneNumber ? new PhoneNumber(input.phoneNumber) : undefined,
    });
    return this.repository.update(profile);
  }
}
