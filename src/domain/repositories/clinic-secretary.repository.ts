import { ClinicSecretaryEntity } from '../entities/clinic-secretary.entity';

export interface IClinicSecretaryRepository {
  save(association: ClinicSecretaryEntity): Promise<ClinicSecretaryEntity>;
  findBySecretaryAndClinic(secretaryId: string, clinicId: string): Promise<ClinicSecretaryEntity | null>;
  findByClinicId(clinicId: string): Promise<ClinicSecretaryEntity[]>;
  delete(secretaryId: string, clinicId: string): Promise<boolean>;
}

export const CLINIC_SECRETARY_REPOSITORY = 'CLINIC_SECRETARY_REPOSITORY';
