import { ClinicMember } from '../entities/clinic-member.entity';

export const CLINIC_MEMBER_REPOSITORY = 'CLINIC_MEMBER_REPOSITORY';

export interface IClinicMemberRepository {
  save(member: ClinicMember): Promise<ClinicMember>;
  findById(id: string): Promise<ClinicMember | null>;
  findByUserAndClinic(userId: string, clinicId: string): Promise<ClinicMember | null>;
  findByClinic(clinicId: string, userLevel?: string): Promise<ClinicMember[]>;
  findByUser(userId: string): Promise<ClinicMember[]>;
  delete(userId: string, clinicId: string): Promise<boolean>;
}
