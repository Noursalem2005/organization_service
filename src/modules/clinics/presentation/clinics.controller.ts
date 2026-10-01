import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClinicUseCase } from '../application/use-cases/create-clinic.use-case';
import { GetClinicUseCase } from '../application/use-cases/get-clinic.use-case';
import { GetOrganizationClinicsUseCase } from '../application/use-cases/get-organization-clinics.use-case';
import { UpdateClinicUseCase } from '../application/use-cases/update-clinic.use-case';
import { DeleteClinicUseCase } from '../application/use-cases/delete-clinic.use-case';
import { CreateClinicInput } from '../application/dto/create-clinic.input';
import { UpdateClinicInput } from '../application/dto/update-clinic.input';

@ApiTags('Clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(
    private readonly createClinicUseCase: CreateClinicUseCase,
    private readonly getClinicUseCase: GetClinicUseCase,
    private readonly getOrganizationClinicsUseCase: GetOrganizationClinicsUseCase,
    private readonly updateClinicUseCase: UpdateClinicUseCase,
    private readonly deleteClinicUseCase: DeleteClinicUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new clinic' })
  @ApiResponse({ status: 201, description: 'Clinic created' })
  async create(@Body() input: CreateClinicInput) {
    const e = await this.createClinicUseCase.execute(input);
    return {
      id: e.id.getValue(),
      organizationId: e.organizationId.getValue(),
      name: e.name,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get clinic by ID' })
  @ApiResponse({ status: 200, description: 'Clinic details' })
  async getById(@Param('id') id: string) {
    const e = await this.getClinicUseCase.execute(id);
    return {
      id: e.id.getValue(),
      organizationId: e.organizationId.getValue(),
      name: e.name,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Get('organization/:organizationId')
  @ApiOperation({ summary: 'Get all clinics belonging to an organization' })
  @ApiResponse({ status: 200, description: 'List of organization clinics' })
  async getByOrganization(@Param('organizationId') orgId: string) {
    const list = await this.getOrganizationClinicsUseCase.execute(orgId);
    return list.map((e) => ({
      id: e.id.getValue(),
      organizationId: e.organizationId.getValue(),
      name: e.name,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update clinic details' })
  @ApiResponse({ status: 200, description: 'Clinic updated' })
  async update(@Param('id') id: string, @Body() input: UpdateClinicInput) {
    const e = await this.updateClinicUseCase.execute(id, input);
    return {
      id: e.id.getValue(),
      organizationId: e.organizationId.getValue(),
      name: e.name,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete clinic' })
  @ApiResponse({ status: 200, description: 'Clinic deleted' })
  async delete(@Param('id') id: string) {
    return { success: await this.deleteClinicUseCase.execute(id) };
  }
}
