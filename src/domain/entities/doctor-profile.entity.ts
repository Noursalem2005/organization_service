import { PhoneNumber } from '../value-objects/phone-number.vo';

export interface DoctorProfileProps {
  doctorId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  subSpecialty?: string;
  licenseNumber: string;
  bio?: string;
  phoneNumber?: PhoneNumber;
  yearsOfExperience?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DoctorProfileEntity {
  private props: DoctorProfileProps;
  constructor(props: DoctorProfileProps) {
    this.props = { ...props, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get doctorId(): string { return this.props.doctorId; }
  get firstName(): string { return this.props.firstName; }
  get lastName(): string { return this.props.lastName; }
  get fullName(): string { return `Dr. ${this.props.firstName} ${this.props.lastName}`; }
  get specialty(): string { return this.props.specialty; }
  get subSpecialty(): string | undefined { return this.props.subSpecialty; }
  get licenseNumber(): string { return this.props.licenseNumber; }
  get bio(): string | undefined { return this.props.bio; }
  get phoneNumber(): PhoneNumber | undefined { return this.props.phoneNumber; }
  get yearsOfExperience(): number | undefined { return this.props.yearsOfExperience; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
  public updateProfile(details: { firstName?: string; lastName?: string; specialty?: string; subSpecialty?: string; licenseNumber?: string; bio?: string; phoneNumber?: PhoneNumber; yearsOfExperience?: number; }): void {
    if (details.firstName) this.props.firstName = details.firstName;
    if (details.lastName) this.props.lastName = details.lastName;
    if (details.specialty) this.props.specialty = details.specialty;
    if (details.subSpecialty !== undefined) this.props.subSpecialty = details.subSpecialty;
    if (details.licenseNumber) this.props.licenseNumber = details.licenseNumber;
    if (details.bio !== undefined) this.props.bio = details.bio;
    if (details.phoneNumber !== undefined) this.props.phoneNumber = details.phoneNumber;
    if (details.yearsOfExperience !== undefined) this.props.yearsOfExperience = details.yearsOfExperience;
    this.props.updatedAt = new Date();
  }
}
