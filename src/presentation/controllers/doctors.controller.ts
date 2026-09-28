import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDoctorUseCase } from '../../application/doctors/use-cases/create-doctor.use-case';
import { GetDoctorUseCase } from '../../application/doctors/use-cases/get-doctor.use-case';
import { UpdateDoctorUseCase } from '../../application/doctors/use-cases/update-doctor.use-case';
import { DeleteDoctorUseCase } from '../../application/doctors/use-cases/delete-doctor.use-case';
import { CreateDoctorInput } from '../../application/doctors/dto/create-doctor.input';
import { UpdateDoctorInput } from '../../application/doctors/dto/update-doctor.input';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly getDoctorUseCase: GetDoctorUseCase,
    private readonly updateDoctorUseCase: UpdateDoctorUseCase,
    private readonly deleteDoctorUseCase: DeleteDoctorUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a doctor and create doctor profile' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully' })
  async create(@Body() input: CreateDoctorInput) {
    const { doctor, profile } = await this.createDoctorUseCase.execute(input);
    return {
      id: doctor.id,
      userId: doctor.userId,
      status: doctor.status,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        fullName: profile.fullName,
        specialty: profile.specialty,
        subSpecialty: profile.subSpecialty,
        licenseNumber: profile.licenseNumber,
        bio: profile.bio,
        phoneNumber: profile.phoneNumber?.getValue(),
        yearsOfExperience: profile.yearsOfExperience,
      },
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor details and profile by ID' })
  @ApiResponse({ status: 200, description: 'Doctor profile' })
  async getById(@Param('id') id: string) {
    const { doctor, profile } = await this.getDoctorUseCase.execute(id);
    return {
      id: doctor.id,
      userId: doctor.userId,
      status: doctor.status,
      profile: profile
        ? {
            firstName: profile.firstName,
            lastName: profile.lastName,
            fullName: profile.fullName,
            specialty: profile.specialty,
            subSpecialty: profile.subSpecialty,
            licenseNumber: profile.licenseNumber,
            bio: profile.bio,
            phoneNumber: profile.phoneNumber?.getValue(),
            yearsOfExperience: profile.yearsOfExperience,
          }
        : null,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update doctor status or profile info' })
  @ApiResponse({ status: 200, description: 'Doctor updated' })
  async update(@Param('id') id: string, @Body() input: UpdateDoctorInput) {
    const { doctor, profile } = await this.updateDoctorUseCase.execute(id, input);
    return {
      id: doctor.id,
      userId: doctor.userId,
      status: doctor.status,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        fullName: profile.fullName,
        specialty: profile.specialty,
        subSpecialty: profile.subSpecialty,
        licenseNumber: profile.licenseNumber,
        bio: profile.bio,
        phoneNumber: profile.phoneNumber?.getValue(),
        yearsOfExperience: profile.yearsOfExperience,
      },
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor' })
  @ApiResponse({ status: 200, description: 'Doctor deleted' })
  async delete(@Param('id') id: string) {
    return { success: await this.deleteDoctorUseCase.execute(id) };
  }
}
