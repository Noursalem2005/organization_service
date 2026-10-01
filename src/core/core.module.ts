import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './infrastructure/config/database.config';
import appConfig from './infrastructure/config/app.config';
import { MongodbModule } from './infrastructure/database/mongodb/mongodb.module';
import { AUTH_SERVICE_PORT } from './application/ports/auth-service.port';
import { AuthServiceClient } from './infrastructure/external-services/auth-service.client';
import { DASHBOARD_SERVICE_PORT, DashboardServiceClient } from './infrastructure/external-services/dashboard-service.client';

@Global()
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
  providers: [
    { provide: AUTH_SERVICE_PORT, useClass: AuthServiceClient },
    { provide: DASHBOARD_SERVICE_PORT, useClass: DashboardServiceClient },
  ],
  exports: [
    ConfigModule,
    MongooseModule,
    MongodbModule,
    AUTH_SERVICE_PORT,
    DASHBOARD_SERVICE_PORT,
  ],
})
export class CoreModule {}
