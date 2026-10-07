import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicSchemaClass, ClinicSchema } from './infrastructure/schemas/clinic.schema';
import { CLINIC_REPOSITORY } from './domain/repositories/clinic.repository';
import { MongoClinicRepository } from './infrastructure/repositories/mongodb-clinic.repository';
import { CreateClinicUseCase } from './application/use-cases/create-clinic.use-case';
import { GetClinicUseCase } from './application/use-cases/get-clinic.use-case';
import { GetOrganizationClinicsUseCase } from './application/use-cases/get-organization-clinics.use-case';
import { UpdateClinicUseCase } from './application/use-cases/update-clinic.use-case';
import { DeleteClinicUseCase } from './application/use-cases/delete-clinic.use-case';
import { ClinicsController } from './presentation/clinics.controller';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClinicSchemaClass.name, schema: ClinicSchema },
    ]),
    OrganizationsModule,
  ],
  controllers: [ClinicsController],
  providers: [
    { provide: CLINIC_REPOSITORY, useClass: MongoClinicRepository },
    CreateClinicUseCase,
    GetClinicUseCase,
    GetOrganizationClinicsUseCase,
    UpdateClinicUseCase,
    DeleteClinicUseCase,
  ],
  exports: [CLINIC_REPOSITORY, GetClinicUseCase],
})
export class ClinicsModule {}
