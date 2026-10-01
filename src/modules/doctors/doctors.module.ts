import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchemaClass, DoctorSchema } from './infrastructure/schemas/doctor.schema';
import { DoctorProfileSchemaClass, DoctorProfileSchema } from './infrastructure/schemas/doctor-profile.schema';
import { DOCTOR_REPOSITORY } from './domain/repositories/doctor.repository';
import { DOCTOR_PROFILE_REPOSITORY } from './domain/repositories/doctor-profile.repository';
import { MongoDoctorRepository } from './infrastructure/repositories/mongodb-doctor.repository';
import { MongoDoctorProfileRepository } from './infrastructure/repositories/mongodb-doctor-profile.repository';
import { CreateDoctorUseCase } from './application/use-cases/create-doctor.use-case';
import { GetDoctorUseCase } from './application/use-cases/get-doctor.use-case';
import { UpdateDoctorUseCase } from './application/use-cases/update-doctor.use-case';
import { DeleteDoctorUseCase } from './application/use-cases/delete-doctor.use-case';
import { DoctorsController } from './presentation/doctors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DoctorSchemaClass.name, schema: DoctorSchema },
      { name: DoctorProfileSchemaClass.name, schema: DoctorProfileSchema },
    ]),
  ],
  controllers: [DoctorsController],
  providers: [
    { provide: DOCTOR_REPOSITORY, useClass: MongoDoctorRepository },
    { provide: DOCTOR_PROFILE_REPOSITORY, useClass: MongoDoctorProfileRepository },
    CreateDoctorUseCase,
    GetDoctorUseCase,
    UpdateDoctorUseCase,
    DeleteDoctorUseCase,
  ],
  exports: [DOCTOR_REPOSITORY, DOCTOR_PROFILE_REPOSITORY],
})
export class DoctorsModule {}
