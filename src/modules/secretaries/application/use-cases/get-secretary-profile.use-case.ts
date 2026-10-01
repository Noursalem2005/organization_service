import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISecretaryProfileRepository, SECRETARY_PROFILE_REPOSITORY } from '../../domain/repositories/secretary-profile.repository';
import { SecretaryProfileEntity } from '../../domain/entities/secretary-profile.entity';

@Injectable()
export class GetSecretaryProfileUseCase {
  constructor(@Inject(SECRETARY_PROFILE_REPOSITORY) private readonly repository: ISecretaryProfileRepository) {}
  async execute(id: string): Promise<SecretaryProfileEntity> {
    const profile = await this.repository.findById(id);
    if (!profile) throw new NotFoundException(`Secretary Profile with ID '${id}' not found`);
    return profile;
  }
}
