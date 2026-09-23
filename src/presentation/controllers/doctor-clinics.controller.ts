import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssignDoctorToClinicUseCase } from '../../application/doctor-clinics/use-cases/assign-doctor-to-clinic.use-case';
import { RemoveDoctorFromClinicUseCase } from '../../application/doctor-clinics/use-cases/remove-doctor-from-clinic.use-case';
import { GetDoctorClinicsUseCase } from '../../application/doctor-clinics/use-cases/get-doctor-clinics.use-case';
import { GetClinicDoctorsUseCase } from '../../application/doctor-clinics/use-cases/get-clinic-doctors.use-case';
import { AssignDoctorToClinicInput } from '../../application/doctor-clinics/dto/assign-doctor-to-clinic.input';

@Controller('doctor-clinics')
export class DoctorClinicsController {
  constructor(
    private readonly assignDoctorToClinicUseCase: AssignDoctorToClinicUseCase,
    private readonly removeDoctorFromClinicUseCase: RemoveDoctorFromClinicUseCase,
    private readonly getDoctorClinicsUseCase: GetDoctorClinicsUseCase,
    private readonly getClinicDoctorsUseCase: GetClinicDoctorsUseCase,
  ) {}
  @Post('assign') async assign(@Body() input: AssignDoctorToClinicInput) { const e = await this.assignDoctorToClinicUseCase.execute(input); return { id: e.id, doctorId: e.doctorId, clinicId: e.clinicId, consultationFee: e.consultationFee, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt }; }
  @Delete('remove/:doctorId/:clinicId') async remove(@Param('doctorId') docId: string, @Param('clinicId') clinicId: string) { return { success: await this.removeDoctorFromClinicUseCase.execute(docId, clinicId) }; }
  @Get('doctor/:doctorId') async getByDoctor(@Param('doctorId') docId: string) { const list = await this.getDoctorClinicsUseCase.execute(docId); return list.map(e => ({ id: e.id, doctorId: e.doctorId, clinicId: e.clinicId, consultationFee: e.consultationFee, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt })); }
  @Get('clinic/:clinicId') async getByClinic(@Param('clinicId') clinicId: string) { const list = await this.getClinicDoctorsUseCase.execute(clinicId); return list.map(e => ({ id: e.id, doctorId: e.doctorId, clinicId: e.clinicId, consultationFee: e.consultationFee, isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt })); }
}
