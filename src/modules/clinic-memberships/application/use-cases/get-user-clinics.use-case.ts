import { Inject, Injectable } from '@nestjs/common';
import { ClinicMember } from '../../domain/entities/clinic-member.entity';
import { CLINIC_MEMBER_REPOSITORY, IClinicMemberRepository } from '../../domain/repositories/clinic-member.repository';

@Injectable()
export class GetUserClinicsUseCase {
  constructor(
    @Inject(CLINIC_MEMBER_REPOSITORY)
    private readonly memberRepo: IClinicMemberRepository,
  ) {}

  async execute(userId: string): Promise<ClinicMember[]> {
    return this.memberRepo.findByUser(userId);
  }
}
