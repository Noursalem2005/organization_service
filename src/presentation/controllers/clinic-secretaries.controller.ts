import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssignSecretaryToClinicUseCase } from '../../application/clinic-secretaries/use-cases/assign-secretary-to-clinic.use-case';
import { RemoveSecretaryFromClinicUseCase } from '../../application/clinic-secretaries/use-cases/remove-secretary-from-clinic.use-case';
import { GetClinicSecretariesUseCase } from '../../application/clinic-secretaries/use-cases/get-clinic-secretaries.use-case';
import { AssignSecretaryToClinicInput } from '../../application/clinic-secretaries/dto/assign-secretary-to-clinic.input';

@Controller('clinic-secretaries')
export class ClinicSecretariesController {
  constructor(
    private readonly assignUseCase: AssignSecretaryToClinicUseCase,
    private readonly removeUseCase: RemoveSecretaryFromClinicUseCase,
    private readonly getClinicSecretariesUseCase: GetClinicSecretariesUseCase,
  ) {}
  @Post('assign') async assign(@Body() input: AssignSecretaryToClinicInput) { const e = await this.assignUseCase.execute(input); return { id: e.id, secretaryId: e.secretaryId, clinicId: e.clinicId, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt }; }
  @Delete('remove/:secretaryId/:clinicId') async remove(@Param('secretaryId') secId: string, @Param('clinicId') clinicId: string) { return { success: await this.removeUseCase.execute(secId, clinicId) }; }
  @Get('clinic/:clinicId') async getByClinic(@Param('clinicId') clinicId: string) { const list = await this.getClinicSecretariesUseCase.execute(clinicId); return list.map(e => ({ id: e.id, secretaryId: e.secretaryId, clinicId: e.clinicId, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt })); }
}
