export class CreateDoctorInput {
  userId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  subSpecialty?: string;
  licenseNumber: string;
  bio?: string;
  phoneNumber?: string;
  yearsOfExperience?: number;
}
