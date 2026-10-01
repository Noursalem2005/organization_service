import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignClinicMemberUseCase } from '../application/use-cases/assign-clinic-member.use-case';
import { GetClinicMembersUseCase } from '../application/use-cases/get-clinic-members.use-case';
import { RemoveClinicMemberUseCase } from '../application/use-cases/remove-clinic-member.use-case';

@ApiTags('Clinic-Secretaries')
@Controller('clinic-secretaries')
export class ClinicSecretariesController {
  constructor(
    private readonly assignMemberUseCase: AssignClinicMemberUseCase,
    private readonly getMembersUseCase: GetClinicMembersUseCase,
    private readonly removeMemberUseCase: RemoveClinicMemberUseCase,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a secretary to a clinic (Delegates to ClinicMemberships)' })
  @ApiResponse({ status: 201, description: 'Secretary assigned to clinic' })
  async assign(@Body() input: any) {
    const e = await this.assignMemberUseCase.execute({
      userId: input.secretaryId,
      clinicId: input.clinicId,
      userLevel: 'SECRETARY',
    });
    return {
      id: e.id,
      secretaryId: e.userId,
      clinicId: e.clinicId,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Delete('remove/:secretaryId/:clinicId')
  @ApiOperation({ summary: 'Remove a secretary from a clinic' })
  @ApiResponse({ status: 200, description: 'Secretary removed from clinic' })
  async remove(@Param('secretaryId') secId: string, @Param('clinicId') clinicId: string) {
    return { success: await this.removeMemberUseCase.execute(secId, clinicId) };
  }

  @Get('clinic/:clinicId')
  @ApiOperation({ summary: 'Get all secretaries assigned to a clinic' })
  @ApiResponse({ status: 200, description: 'List of assigned secretaries' })
  async getByClinic(@Param('clinicId') clinicId: string) {
    const list = await this.getMembersUseCase.execute(clinicId, 'SECRETARY');
    return list.map((e) => ({
      id: e.id,
      secretaryId: e.userId,
      clinicId: e.clinicId,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }
}
