import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISecretaryProfileRepository, SECRETARY_PROFILE_REPOSITORY } from '../../../domain/repositories/secretary-profile.repository';

@Injectable()
export class DeleteSecretaryProfileUseCase {
  constructor(@Inject(SECRETARY_PROFILE_REPOSITORY) private readonly repository: ISecretaryProfileRepository) {}
  async execute(id: string): Promise<boolean> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException(`Secretary Profile with ID '${id}' not found`);
    return this.repository.delete(id);
  }
}
