import { Inject, Injectable } from '@nestjs/common';
import { CLINIC_MEMBER_REPOSITORY, IClinicMemberRepository } from '../../domain/repositories/clinic-member.repository';

@Injectable()
export class RemoveClinicMemberUseCase {
  constructor(
    @Inject(CLINIC_MEMBER_REPOSITORY)
    private readonly memberRepo: IClinicMemberRepository,
  ) {}

  async execute(userId: string, clinicId: string): Promise<boolean> {
    return this.memberRepo.delete(userId, clinicId);
  }
}
