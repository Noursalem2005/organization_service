import { DoctorStatus } from '../enums/doctor-status.enum';

export interface DoctorProps {
  id: string;
  userId: string;
  status?: DoctorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DoctorEntity {
  private props: DoctorProps;
  constructor(props: DoctorProps) {
    this.props = { ...props, status: props.status ?? DoctorStatus.PENDING_VERIFICATION, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get status(): DoctorStatus { return this.props.status ?? DoctorStatus.PENDING_VERIFICATION; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
  public activate(): void { this.props.status = DoctorStatus.ACTIVE; this.props.updatedAt = new Date(); }
  public deactivate(): void { this.props.status = DoctorStatus.INACTIVE; this.props.updatedAt = new Date(); }
  public suspend(): void { this.props.status = DoctorStatus.SUSPENDED; this.props.updatedAt = new Date(); }
}
