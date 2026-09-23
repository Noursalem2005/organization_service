import { Inject, Injectable } from '@nestjs/common';
import { IClinicSecretaryRepository, CLINIC_SECRETARY_REPOSITORY } from '../../../domain/repositories/clinic-secretary.repository';
import { ClinicSecretaryEntity } from '../../../domain/entities/clinic-secretary.entity';

@Injectable()
export class GetClinicSecretariesUseCase {
  constructor(@Inject(CLINIC_SECRETARY_REPOSITORY) private readonly repository: IClinicSecretaryRepository) {}
  async execute(clinicId: string): Promise<ClinicSecretaryEntity[]> {
    return this.repository.findByClinicId(clinicId);
  }
}
