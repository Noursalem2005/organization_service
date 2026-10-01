import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../domain/repositories/clinic.repository';
import { ClinicEntity } from '../../domain/entities/clinic.entity';
import { ClinicId } from '../../../../core/domain/value-objects/clinic-id.vo';

@Injectable()
export class GetClinicUseCase {
  constructor(@Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository) {}
  async execute(idString: string): Promise<ClinicEntity> {
    const clinic = await this.clinicRepository.findById(new ClinicId(idString));
    if (!clinic) throw new NotFoundException(`Clinic with ID '${idString}' not found`);
    return clinic;
  }
}
