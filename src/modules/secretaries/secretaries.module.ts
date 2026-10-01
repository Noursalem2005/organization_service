import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretaryProfileSchemaClass, SecretaryProfileSchema } from './infrastructure/schemas/secretary-profile.schema';
import { SECRETARY_PROFILE_REPOSITORY } from './domain/repositories/secretary-profile.repository';
import { MongoSecretaryProfileRepository } from './infrastructure/repositories/mongodb-secretary-profile.repository';
import { CreateSecretaryProfileUseCase } from './application/use-cases/create-secretary-profile.use-case';
import { GetSecretaryProfileUseCase } from './application/use-cases/get-secretary-profile.use-case';
import { UpdateSecretaryProfileUseCase } from './application/use-cases/update-secretary-profile.use-case';
import { DeleteSecretaryProfileUseCase } from './application/use-cases/delete-secretary-profile.use-case';
import { SecretariesController } from './presentation/secretaries.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecretaryProfileSchemaClass.name, schema: SecretaryProfileSchema },
    ]),
  ],
  controllers: [SecretariesController],
  providers: [
    { provide: SECRETARY_PROFILE_REPOSITORY, useClass: MongoSecretaryProfileRepository },
    CreateSecretaryProfileUseCase,
    GetSecretaryProfileUseCase,
    UpdateSecretaryProfileUseCase,
    DeleteSecretaryProfileUseCase,
  ],
  exports: [SECRETARY_PROFILE_REPOSITORY],
})
export class SecretariesModule {}
