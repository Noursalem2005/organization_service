import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { SecretariesModule } from './modules/secretaries/secretaries.module';
import { ClinicMembershipsModule } from './modules/clinic-memberships/clinic-memberships.module';

@Module({
  imports: [
    CoreModule,
    OrganizationsModule,
    ClinicsModule,
    DoctorsModule,
    SecretariesModule,
    ClinicMembershipsModule,
  ],
})
export class AppModule {}
