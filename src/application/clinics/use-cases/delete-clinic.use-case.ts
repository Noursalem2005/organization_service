import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../../domain/repositories/clinic.repository';
import { ClinicId } from '../../../domain/value-objects/clinic-id.vo';

@Injectable()
export class DeleteClinicUseCase {
  constructor(@Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository) {}
  async execute(idString: string): Promise<boolean> {
    const id = new ClinicId(idString);
    const existing = await this.clinicRepository.findById(id);
    if (!existing) throw new NotFoundException(`Clinic with ID '${idString}' not found`);
    return this.clinicRepository.delete(id);
  }
}
