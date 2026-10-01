import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchemaClass, OrganizationSchema } from './infrastructure/schemas/organization.schema';
import { ORGANIZATION_REPOSITORY } from './domain/repositories/organization.repository';
import { MongoOrganizationRepository } from './infrastructure/repositories/mongodb-organization.repository';
import { CreateOrganizationUseCase } from './application/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from './application/use-cases/get-organization.use-case';
import { UpdateOrganizationUseCase } from './application/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from './application/use-cases/delete-organization.use-case';
import { OrganizationsController } from './presentation/organizations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationSchemaClass.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [
    { provide: ORGANIZATION_REPOSITORY, useClass: MongoOrganizationRepository },
    CreateOrganizationUseCase,
    GetOrganizationUseCase,
    UpdateOrganizationUseCase,
    DeleteOrganizationUseCase,
  ],
  exports: [ORGANIZATION_REPOSITORY, CreateOrganizationUseCase, GetOrganizationUseCase],
})
export class OrganizationsModule {}
