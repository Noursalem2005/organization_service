import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './infrastructure/config/database.config';
import appConfig from './infrastructure/config/app.config';
import { MongodbModule } from './infrastructure/database/mongodb/mongodb.module';

// Repositories
import { ORGANIZATION_REPOSITORY } from './domain/repositories/organization.repository';
import { MongoOrganizationRepository } from './infrastructure/repositories/mongodb-organization.repository';
import { CLINIC_REPOSITORY } from './domain/repositories/clinic.repository';
import { MongoClinicRepository } from './infrastructure/repositories/mongodb-clinic.repository';
import { DOCTOR_REPOSITORY } from './domain/repositories/doctor.repository';
import { MongoDoctorRepository } from './infrastructure/repositories/mongodb-doctor.repository';
import { DOCTOR_PROFILE_REPOSITORY } from './domain/repositories/doctor-profile.repository';
import { MongoDoctorProfileRepository } from './infrastructure/repositories/mongodb-doctor-profile.repository';
import { DOCTOR_CLINIC_REPOSITORY } from './domain/repositories/doctor-clinic.repository';
import { MongoDoctorClinicRepository } from './infrastructure/repositories/mongodb-doctor-clinic.repository';
import { SECRETARY_PROFILE_REPOSITORY } from './domain/repositories/secretary-profile.repository';
import { MongoSecretaryProfileRepository } from './infrastructure/repositories/mongodb-secretary-profile.repository';
import { CLINIC_SECRETARY_REPOSITORY } from './domain/repositories/clinic-secretary.repository';
import { MongoClinicSecretaryRepository } from './infrastructure/repositories/mongodb-clinic-secretary.repository';

// Use Cases
import { CreateOrganizationUseCase } from './application/organizations/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from './application/organizations/use-cases/get-organization.use-case';
import { UpdateOrganizationUseCase } from './application/organizations/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from './application/organizations/use-cases/delete-organization.use-case';

import { CreateClinicUseCase } from './application/clinics/use-cases/create-clinic.use-case';
import { GetClinicUseCase } from './application/clinics/use-cases/get-clinic.use-case';
import { GetOrganizationClinicsUseCase } from './application/clinics/use-cases/get-organization-clinics.use-case';
import { UpdateClinicUseCase } from './application/clinics/use-cases/update-clinic.use-case';
import { DeleteClinicUseCase } from './application/clinics/use-cases/delete-clinic.use-case';

import { CreateDoctorUseCase } from './application/doctors/use-cases/create-doctor.use-case';
import { GetDoctorUseCase } from './application/doctors/use-cases/get-doctor.use-case';
import { UpdateDoctorUseCase } from './application/doctors/use-cases/update-doctor.use-case';
import { DeleteDoctorUseCase } from './application/doctors/use-cases/delete-doctor.use-case';

import { AssignDoctorToClinicUseCase } from './application/doctor-clinics/use-cases/assign-doctor-to-clinic.use-case';
import { RemoveDoctorFromClinicUseCase } from './application/doctor-clinics/use-cases/remove-doctor-from-clinic.use-case';
import { GetDoctorClinicsUseCase } from './application/doctor-clinics/use-cases/get-doctor-clinics.use-case';
import { GetClinicDoctorsUseCase } from './application/doctor-clinics/use-cases/get-clinic-doctors.use-case';

import { CreateSecretaryProfileUseCase } from './application/secretaries/use-cases/create-secretary-profile.use-case';
import { GetSecretaryProfileUseCase } from './application/secretaries/use-cases/get-secretary-profile.use-case';
import { UpdateSecretaryProfileUseCase } from './application/secretaries/use-cases/update-secretary-profile.use-case';
import { DeleteSecretaryProfileUseCase } from './application/secretaries/use-cases/delete-secretary-profile.use-case';

import { AssignSecretaryToClinicUseCase } from './application/clinic-secretaries/use-cases/assign-secretary-to-clinic.use-case';
import { RemoveSecretaryFromClinicUseCase } from './application/clinic-secretaries/use-cases/remove-secretary-from-clinic.use-case';
import { GetClinicSecretariesUseCase } from './application/clinic-secretaries/use-cases/get-clinic-secretaries.use-case';

// Controllers
import { OrganizationsController } from './presentation/controllers/organizations.controller';
import { ClinicsController } from './presentation/controllers/clinics.controller';
import { DoctorsController } from './presentation/controllers/doctors.controller';
import { DoctorClinicsController } from './presentation/controllers/doctor-clinics.controller';
import { SecretariesController } from './presentation/controllers/secretaries.controller';
import { ClinicSecretariesController } from './presentation/controllers/clinic-secretaries.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongodbUri') || 'mongodb://localhost:27017/organization-service',
      }),
      inject: [ConfigService],
    }),
    MongodbModule,
  ],
  controllers: [
    OrganizationsController,
    ClinicsController,
    DoctorsController,
    DoctorClinicsController,
    SecretariesController,
    ClinicSecretariesController,
  ],
  providers: [
    // Repository Bindings
    { provide: ORGANIZATION_REPOSITORY, useClass: MongoOrganizationRepository },
    { provide: CLINIC_REPOSITORY, useClass: MongoClinicRepository },
    { provide: DOCTOR_REPOSITORY, useClass: MongoDoctorRepository },
    { provide: DOCTOR_PROFILE_REPOSITORY, useClass: MongoDoctorProfileRepository },
    { provide: DOCTOR_CLINIC_REPOSITORY, useClass: MongoDoctorClinicRepository },
    { provide: SECRETARY_PROFILE_REPOSITORY, useClass: MongoSecretaryProfileRepository },
    { provide: CLINIC_SECRETARY_REPOSITORY, useClass: MongoClinicSecretaryRepository },

    // Organization Use Cases
    CreateOrganizationUseCase,
    GetOrganizationUseCase,
    UpdateOrganizationUseCase,
    DeleteOrganizationUseCase,

    // Clinic Use Cases
    CreateClinicUseCase,
    GetClinicUseCase,
    GetOrganizationClinicsUseCase,
    UpdateClinicUseCase,
    DeleteClinicUseCase,

    // Doctor Use Cases
    CreateDoctorUseCase,
    GetDoctorUseCase,
    UpdateDoctorUseCase,
    DeleteDoctorUseCase,

    // Doctor Clinic Use Cases
    AssignDoctorToClinicUseCase,
    RemoveDoctorFromClinicUseCase,
    GetDoctorClinicsUseCase,
    GetClinicDoctorsUseCase,

    // Secretary Use Cases
    CreateSecretaryProfileUseCase,
    GetSecretaryProfileUseCase,
    UpdateSecretaryProfileUseCase,
    DeleteSecretaryProfileUseCase,

    // Clinic Secretary Use Cases
    AssignSecretaryToClinicUseCase,
    RemoveSecretaryFromClinicUseCase,
    GetClinicSecretariesUseCase,
  ],
})
export class AppModule {}
