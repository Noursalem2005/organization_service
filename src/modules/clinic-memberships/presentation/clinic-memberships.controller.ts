import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignClinicMemberInput } from '../application/dto/assign-clinic-member.input';
import { AssignClinicMemberUseCase } from '../application/use-cases/assign-clinic-member.use-case';
import { GetClinicMembersUseCase } from '../application/use-cases/get-clinic-members.use-case';
import { GetUserClinicsUseCase } from '../application/use-cases/get-user-clinics.use-case';
import { RemoveClinicMemberUseCase } from '../application/use-cases/remove-clinic-member.use-case';

@ApiTags('Clinic-Memberships')
@Controller('clinic-memberships')
export class ClinicMembershipsController {
  constructor(
    private readonly assignMemberUseCase: AssignClinicMemberUseCase,
    private readonly getMembersUseCase: GetClinicMembersUseCase,
    private readonly getUserClinicsUseCase: GetUserClinicsUseCase,
    private readonly removeMemberUseCase: RemoveClinicMemberUseCase,
  ) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a user to a clinic with generic userLevel, roles, permissions & metadata' })
  @ApiResponse({ status: 201, description: 'Member assigned to clinic' })
  async assign(@Body() input: AssignClinicMemberInput) {
    return this.assignMemberUseCase.execute(input);
  }

  @Get('clinic/:clinicId')
  @ApiOperation({ summary: 'Get all members assigned to a clinic, optionally filtered by userLevel (e.g. DOCTOR, SECRETARY)' })
  @ApiResponse({ status: 200, description: 'List of members' })
  async getByClinic(@Param('clinicId') clinicId: string, @Query('userLevel') userLevel?: string) {
    return this.getMembersUseCase.execute(clinicId, userLevel);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all clinic memberships for a specific user' })
  @ApiResponse({ status: 200, description: 'List of clinic memberships' })
  async getByUser(@Param('userId') userId: string) {
    return this.getUserClinicsUseCase.execute(userId);
  }

  @Delete('remove/:clinicId/:userId')
  @ApiOperation({ summary: 'Remove a user from a clinic' })
  @ApiResponse({ status: 200, description: 'Membership removed' })
  async remove(@Param('clinicId') clinicId: string, @Param('userId') userId: string) {
    return { success: await this.removeMemberUseCase.execute(userId, clinicId) };
  }
}
