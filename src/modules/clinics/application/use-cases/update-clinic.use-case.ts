import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClinicRepository, CLINIC_REPOSITORY } from '../../domain/repositories/clinic.repository';
import { ClinicEntity } from '../../domain/entities/clinic.entity';
import { ClinicId } from '../../../../core/domain/value-objects/clinic-id.vo';
import { UpdateClinicInput } from '../dto/update-clinic.input';

@Injectable()
export class UpdateClinicUseCase {
  constructor(@Inject(CLINIC_REPOSITORY) private readonly clinicRepository: IClinicRepository) {}
  async execute(idString: string, input: UpdateClinicInput): Promise<ClinicEntity> {
    const clinic = await this.clinicRepository.findById(new ClinicId(idString));
    if (!clinic) throw new NotFoundException(`Clinic with ID '${idString}' not found`);
    clinic.updateDetails({ name: input.name, phone: input.phone, address: input.address });
    if (input.isActive === true) clinic.activate();
    else if (input.isActive === false) clinic.deactivate();
    return this.clinicRepository.update(clinic);
  }
}
