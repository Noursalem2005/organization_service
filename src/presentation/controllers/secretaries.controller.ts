import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSecretaryProfileUseCase } from '../../application/secretaries/use-cases/create-secretary-profile.use-case';
import { GetSecretaryProfileUseCase } from '../../application/secretaries/use-cases/get-secretary-profile.use-case';
import { UpdateSecretaryProfileUseCase } from '../../application/secretaries/use-cases/update-secretary-profile.use-case';
import { DeleteSecretaryProfileUseCase } from '../../application/secretaries/use-cases/delete-secretary-profile.use-case';
import { CreateSecretaryProfileInput } from '../../application/secretaries/dto/create-secretary-profile.input';
import { UpdateSecretaryProfileInput } from '../../application/secretaries/dto/update-secretary-profile.input';

@ApiTags('Secretaries')
@Controller('secretaries')
export class SecretariesController {
  constructor(
    private readonly createUseCase: CreateSecretaryProfileUseCase,
    private readonly getUseCase: GetSecretaryProfileUseCase,
    private readonly updateUseCase: UpdateSecretaryProfileUseCase,
    private readonly deleteUseCase: DeleteSecretaryProfileUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create secretary profile' })
  @ApiResponse({ status: 201, description: 'Secretary created' })
  async create(@Body() input: CreateSecretaryProfileInput) {
    const e = await this.createUseCase.execute(input);
    return {
      id: e.id,
      userId: e.userId,
      firstName: e.firstName,
      lastName: e.lastName,
      fullName: e.fullName,
      phoneNumber: e.phoneNumber?.getValue(),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get secretary by ID' })
  @ApiResponse({ status: 200, description: 'Secretary profile' })
  async getById(@Param('id') id: string) {
    const e = await this.getUseCase.execute(id);
    return {
      id: e.id,
      userId: e.userId,
      firstName: e.firstName,
      lastName: e.lastName,
      fullName: e.fullName,
      phoneNumber: e.phoneNumber?.getValue(),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update secretary profile' })
  @ApiResponse({ status: 200, description: 'Secretary profile updated' })
  async update(@Param('id') id: string, @Body() input: UpdateSecretaryProfileInput) {
    const e = await this.updateUseCase.execute(id, input);
    return {
      id: e.id,
      userId: e.userId,
      firstName: e.firstName,
      lastName: e.lastName,
      fullName: e.fullName,
      phoneNumber: e.phoneNumber?.getValue(),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete secretary profile' })
  @ApiResponse({ status: 200, description: 'Secretary profile deleted' })
  async delete(@Param('id') id: string) {
    return { success: await this.deleteUseCase.execute(id) };
  }
}
