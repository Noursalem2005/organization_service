import { ClinicId } from '../value-objects/clinic-id.vo';
import { OrganizationId } from '../value-objects/organization-id.vo';

export interface ClinicProps {
  id: ClinicId;
  organizationId: OrganizationId;
  name: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ClinicEntity {
  private props: ClinicProps;
  constructor(props: ClinicProps) {
    this.props = { ...props, isActive: props.isActive ?? true, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get id(): ClinicId { return this.props.id; }
  get organizationId(): OrganizationId { return this.props.organizationId; }
  get name(): string { return this.props.name; }
  get phone(): string | undefined { return this.props.phone; }
  get address(): string | undefined { return this.props.address; }
  get isActive(): boolean { return this.props.isActive ?? true; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
  public activate(): void { this.props.isActive = true; this.props.updatedAt = new Date(); }
  public deactivate(): void { this.props.isActive = false; this.props.updatedAt = new Date(); }
  public updateDetails(details: { name?: string; phone?: string; address?: string }): void {
    if (details.name) this.props.name = details.name;
    if (details.phone !== undefined) this.props.phone = details.phone;
    if (details.address !== undefined) this.props.address = details.address;
    this.props.updatedAt = new Date();
  }
}
