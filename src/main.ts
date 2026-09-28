import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('organization');
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Organization Service API')
    .setDescription('Microservice API documentation for Organizations, Clinics, Doctors, Profiles, and Secretaries.')
    .setVersion('1.0')
    .addTag('Organizations', 'Management of organization entities')
    .addTag('Clinics', 'Management of clinics under organizations')
    .addTag('Doctors', 'Doctor registration, verification status and profiles')
    .addTag('Doctor-Clinics', 'Assignments and consultation fees for doctors in clinics')
    .addTag('Secretaries', 'Secretary profiles and staff management')
    .addTag('Clinic-Secretaries', 'Secretary assignments to clinics')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Serves Swagger UI on both /organization/docs and /docs
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3004;
  await app.listen(port);
  console.log(`Organization Service is running on port ${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/organization/docs`);
  console.log(`Alternative Swagger url: http://localhost:${port}/docs`);
}
bootstrap();
