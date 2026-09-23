export interface DoctorClinicProps {
  id: string;
  doctorId: string;
  clinicId: string;
  consultationFee?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DoctorClinicEntity {
  private props: DoctorClinicProps;
  constructor(props: DoctorClinicProps) {
    this.props = { ...props, isActive: props.isActive ?? true, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get id(): string { return this.props.id; }
  get doctorId(): string { return this.props.doctorId; }
  get clinicId(): string { return this.props.clinicId; }
  get consultationFee(): number | undefined { return this.props.consultationFee; }
  get isActive(): boolean { return this.props.isActive ?? true; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
  public setConsultationFee(fee: number): void {
    if (fee < 0) throw new Error('Consultation fee cannot be negative');
    this.props.consultationFee = fee;
    this.props.updatedAt = new Date();
  }
  public activate(): void { this.props.isActive = true; this.props.updatedAt = new Date(); }
  public deactivate(): void { this.props.isActive = false; this.props.updatedAt = new Date(); }
}
