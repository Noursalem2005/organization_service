import { DoctorStatus } from '../../../domain/enums/doctor-status.enum';
export class UpdateDoctorInput {
  status?: DoctorStatus;
  firstName?: string;
  lastName?: string;
  specialty?: string;
  subSpecialty?: string;
  licenseNumber?: string;
  bio?: string;
  phoneNumber?: string;
  yearsOfExperience?: number;
}
