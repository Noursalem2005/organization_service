import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicMemberSchema, ClinicMemberMongoSchema } from './infrastructure/schemas/clinic-member.schema';
import { CLINIC_MEMBER_REPOSITORY } from './domain/repositories/clinic-member.repository';
import { MongoClinicMemberRepository } from './infrastructure/repositories/mongodb-clinic-member.repository';
import { AssignClinicMemberUseCase } from './application/use-cases/assign-clinic-member.use-case';
import { GetClinicMembersUseCase } from './application/use-cases/get-clinic-members.use-case';
import { GetUserClinicsUseCase } from './application/use-cases/get-user-clinics.use-case';
import { RemoveClinicMemberUseCase } from './application/use-cases/remove-clinic-member.use-case';
import { ClinicMembershipsController } from './presentation/clinic-memberships.controller';
import { DoctorClinicsController } from './presentation/doctor-clinics.controller';
import { ClinicSecretariesController } from './presentation/clinic-secretaries.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClinicMemberSchema.name, schema: ClinicMemberMongoSchema },
    ]),
  ],
  controllers: [
    ClinicMembershipsController,
    DoctorClinicsController,
    ClinicSecretariesController,
  ],
  providers: [
    { provide: CLINIC_MEMBER_REPOSITORY, useClass: MongoClinicMemberRepository },
    AssignClinicMemberUseCase,
    GetClinicMembersUseCase,
    GetUserClinicsUseCase,
    RemoveClinicMemberUseCase,
  ],
  exports: [
    CLINIC_MEMBER_REPOSITORY,
    AssignClinicMemberUseCase,
    GetClinicMembersUseCase,
    GetUserClinicsUseCase,
  ],
})
export class ClinicMembershipsModule {}
