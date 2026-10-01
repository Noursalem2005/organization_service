import { PhoneNumber } from '../../../../core/domain/value-objects/phone-number.vo';

export interface SecretaryProfileProps {
  id: string;
  userId: string;
  employeeCode?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: PhoneNumber;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SecretaryProfileEntity {
  private props: SecretaryProfileProps;
  constructor(props: SecretaryProfileProps) {
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }
  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get employeeCode(): string | undefined { return this.props.employeeCode; }
  get firstName(): string { return this.props.firstName; }
  get lastName(): string { return this.props.lastName; }
  get fullName(): string { return `${this.props.firstName} ${this.props.lastName}`; }
  get phoneNumber(): PhoneNumber | undefined { return this.props.phoneNumber; }
  get isActive(): boolean { return this.props.isActive ?? true; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }

  public update(details: { firstName?: string; lastName?: string; phoneNumber?: PhoneNumber; isActive?: boolean }): void {
    if (details.firstName) this.props.firstName = details.firstName;
    if (details.lastName) this.props.lastName = details.lastName;
    if (details.phoneNumber !== undefined) this.props.phoneNumber = details.phoneNumber;
    if (details.isActive !== undefined) this.props.isActive = details.isActive;
    this.props.updatedAt = new Date();
  }
}
