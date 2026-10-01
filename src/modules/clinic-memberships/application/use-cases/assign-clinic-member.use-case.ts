import { Inject, Injectable } from '@nestjs/common';
import { ClinicMember } from '../../domain/entities/clinic-member.entity';
import { CLINIC_MEMBER_REPOSITORY, IClinicMemberRepository } from '../../domain/repositories/clinic-member.repository';
import { AssignClinicMemberInput } from '../dto/assign-clinic-member.input';

@Injectable()
export class AssignClinicMemberUseCase {
  constructor(
    @Inject(CLINIC_MEMBER_REPOSITORY)
    private readonly memberRepo: IClinicMemberRepository,
  ) {}

  async execute(input: AssignClinicMemberInput): Promise<ClinicMember> {
    const member = new ClinicMember(
      '',
      input.userId,
      input.clinicId,
      input.organizationId || '',
      input.userLevel || 'DOCTOR',
      input.roles || [input.userLevel || 'DOCTOR'],
      input.permissions || [],
      input.isActive !== false,
      input.roleMetadata || {},
    );
    return this.memberRepo.save(member);
  }
}
