import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchemaClass, OrganizationSchema } from './schemas/organization.schema';
import { ClinicSchemaClass, ClinicSchema } from './schemas/clinic.schema';
import { DoctorSchemaClass, DoctorSchema } from './schemas/doctor.schema';
import { DoctorProfileSchemaClass, DoctorProfileSchema } from './schemas/doctor-profile.schema';
import { DoctorClinicSchemaClass, DoctorClinicSchema } from './schemas/doctor-clinic.schema';
import { SecretaryProfileSchemaClass, SecretaryProfileSchema } from './schemas/secretary-profile.schema';
import { ClinicSecretarySchemaClass, ClinicSecretarySchema } from './schemas/clinic-secretary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationSchemaClass.name, schema: OrganizationSchema },
      { name: ClinicSchemaClass.name, schema: ClinicSchema },
      { name: DoctorSchemaClass.name, schema: DoctorSchema },
      { name: DoctorProfileSchemaClass.name, schema: DoctorProfileSchema },
      { name: DoctorClinicSchemaClass.name, schema: DoctorClinicSchema },
      { name: SecretaryProfileSchemaClass.name, schema: SecretaryProfileSchema },
      { name: ClinicSecretarySchemaClass.name, schema: ClinicSecretarySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongodbModule {}
