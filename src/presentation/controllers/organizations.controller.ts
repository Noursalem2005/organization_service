import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrganizationUseCase } from '../../application/organizations/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from '../../application/organizations/use-cases/get-organization.use-case';
import { UpdateOrganizationUseCase } from '../../application/organizations/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from '../../application/organizations/use-cases/delete-organization.use-case';
import { CreateOrganizationInput } from '../../application/organizations/dto/create-organization.input';
import { UpdateOrganizationInput } from '../../application/organizations/dto/update-organization.input';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly getOrganizationUseCase: GetOrganizationUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  async create(@Body() input: CreateOrganizationInput) {
    const e = await this.createOrganizationUseCase.execute(input);
    return {
      id: e.id.getValue(),
      name: e.name,
      type: e.type,
      email: e.email,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'Organization details' })
  async getById(@Param('id') id: string) {
    const e = await this.getOrganizationUseCase.execute(id);
    return {
      id: e.id.getValue(),
      name: e.name,
      type: e.type,
      email: e.email,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update organization details' })
  @ApiResponse({ status: 200, description: 'Organization updated' })
  async update(@Param('id') id: string, @Body() input: UpdateOrganizationInput) {
    const e = await this.updateOrganizationUseCase.execute(id, input);
    return {
      id: e.id.getValue(),
      name: e.name,
      type: e.type,
      email: e.email,
      phone: e.phone,
      address: e.address,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({ status: 200, description: 'Organization deleted' })
  async delete(@Param('id') id: string) {
    return { success: await this.deleteOrganizationUseCase.execute(id) };
  }
}
