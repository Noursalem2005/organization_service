import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicSecretaryRepository, CLINIC_SECRETARY_REPOSITORY } from '../../../domain/repositories/clinic-secretary.repository';

@Injectable()
export class RemoveSecretaryFromClinicUseCase {
  constructor(@Inject(CLINIC_SECRETARY_REPOSITORY) private readonly repository: IClinicSecretaryRepository) {}
  async execute(secretaryId: string, clinicId: string): Promise<boolean> {
    const existing = await this.repository.findBySecretaryAndClinic(secretaryId, clinicId);
    if (!existing) throw new NotFoundException(`Association between Secretary '${secretaryId}' and Clinic '${clinicId}' not found`);
    return this.repository.delete(secretaryId, clinicId);
  }
}
