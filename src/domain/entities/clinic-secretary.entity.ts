export interface ClinicSecretaryProps {
  id: string;
  secretaryId: string;
  clinicId: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ClinicSecretaryEntity {
  private props: ClinicSecretaryProps;
  constructor(props: ClinicSecretaryProps) {
    this.props = { ...props, isActive: props.isActive ?? true, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get id(): string { return this.props.id; }
  get secretaryId(): string { return this.props.secretaryId; }
  get clinicId(): string { return this.props.clinicId; }
  get isActive(): boolean { return this.props.isActive ?? true; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
}
