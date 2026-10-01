import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignClinicMemberUseCase } from '../application/use-cases/assign-clinic-member.use-case';
import { GetClinicMembersUseCase } from '../application/use-cases/get-clinic-members.use-case';
import { GetUserClinicsUseCase } from '../application/use-cases/get-user-clinics.use-case';
import { RemoveClinicMemberUseCase } from '../application/use-cases/remove-clinic-member.use-case';

@ApiTags('Doctor-Clinics')
@Controller('doctor-clinics')
export class DoctorClinicsController {
  constructor(
    private readonly assignMemberUseCase: AssignClinicMemberUseCase,
    private readonly getMembersUseCase: GetClinicMembersUseCase,
    private readonly getUserClinicsUseCase: GetUserClinicsUseCase,
    private readonly removeMemberUseCase: RemoveClinicMemberUseCase,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a doctor to a clinic with custom consultation fee (Delegates to ClinicMemberships)' })
  @ApiResponse({ status: 201, description: 'Doctor assigned to clinic' })
  async assign(@Body() input: any) {
    const e = await this.assignMemberUseCase.execute({
      userId: input.doctorId,
      clinicId: input.clinicId,
      userLevel: 'DOCTOR',
      roleMetadata: { consultationFee: input.consultationFee },
    });
    return {
      id: e.id,
      doctorId: e.userId,
      clinicId: e.clinicId,
      consultationFee: e.roleMetadata?.consultationFee || 0,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  @Delete('remove/:doctorId/:clinicId')
  @ApiOperation({ summary: 'Remove a doctor from a clinic' })
  @ApiResponse({ status: 200, description: 'Doctor removed from clinic' })
  async remove(@Param('doctorId') docId: string, @Param('clinicId') clinicId: string) {
    return { success: await this.removeMemberUseCase.execute(docId, clinicId) };
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get all clinics where a doctor is assigned' })
  @ApiResponse({ status: 200, description: 'List of clinics' })
  async getByDoctor(@Param('doctorId') docId: string) {
    const list = await this.getUserClinicsUseCase.execute(docId);
    return list.map((e) => ({
      id: e.id,
      doctorId: e.userId,
      clinicId: e.clinicId,
      consultationFee: e.roleMetadata?.consultationFee || 0,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }

  @Get('clinic/:clinicId')
  @ApiOperation({ summary: 'Get all doctors assigned to a clinic' })
  @ApiResponse({ status: 200, description: 'List of assigned doctors' })
  async getByClinic(@Param('clinicId') clinicId: string) {
    const list = await this.getMembersUseCase.execute(clinicId, 'DOCTOR');
    return list.map((e) => ({
      id: e.id,
      doctorId: e.userId,
      clinicId: e.clinicId,
      consultationFee: e.roleMetadata?.consultationFee || 0,
      isActive: e.isActive,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }
}
