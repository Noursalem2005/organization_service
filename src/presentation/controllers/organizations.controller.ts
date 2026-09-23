import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrganizationUseCase } from '../../application/organizations/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from '../../application/organizations/use-cases/get-organization.use-case';
import { UpdateOrganizationUseCase } from '../../application/organizations/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from '../../application/organizations/use-cases/delete-organization.use-case';
import { CreateOrganizationInput } from '../../application/organizations/dto/create-organization.input';
import { UpdateOrganizationInput } from '../../application/organizations/dto/update-organization.input';

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly getOrganizationUseCase: GetOrganizationUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
  ) {}
  @Post() async create(@Body() input: CreateOrganizationInput) { const e = await this.createOrganizationUseCase.execute(input); return { id: e.id.getValue(), name: e.name, type: e.type, email: e.email, phone: e.phone, address: e.address, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt }; }
  @Get(':id') async getById(@Param('id') id: string) { const e = await this.getOrganizationUseCase.execute(id); return { id: e.id.getValue(), name: e.name, type: e.type, email: e.email, phone: e.phone, address: e.address, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt }; }
  @Put(':id') async update(@Param('id') id: string, @Body() input: UpdateOrganizationInput) { const e = await this.updateOrganizationUseCase.execute(id, input); return { id: e.id.getValue(), name: e.name, type: e.type, email: e.email, phone: e.phone, address: e.address, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt }; }
  @Delete(':id') async delete(@Param('id') id: string) { return { success: await this.deleteOrganizationUseCase.execute(id) }; }
}
