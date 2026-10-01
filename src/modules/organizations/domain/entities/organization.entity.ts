import { OrganizationId } from '../../../../core/domain/value-objects/organization-id.vo';
import { OrganizationType } from '../enums/organization-type.enum';

export interface OrganizationProps {
  id: OrganizationId;
  name: string;
  type: OrganizationType;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrganizationEntity {
  private props: OrganizationProps;
  constructor(props: OrganizationProps) {
    this.props = { ...props, isActive: props.isActive ?? true, createdAt: props.createdAt ?? new Date(), updatedAt: props.updatedAt ?? new Date() };
  }
  get id(): OrganizationId { return this.props.id; }
  get name(): string { return this.props.name; }
  get type(): OrganizationType { return this.props.type; }
  get email(): string | undefined { return this.props.email; }
  get phone(): string | undefined { return this.props.phone; }
  get address(): string | undefined { return this.props.address; }
  get isActive(): boolean { return this.props.isActive ?? true; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }
  public activate(): void { this.props.isActive = true; this.props.updatedAt = new Date(); }
  public deactivate(): void { this.props.isActive = false; this.props.updatedAt = new Date(); }
  public updateDetails(details: { name?: string; type?: OrganizationType; email?: string; phone?: string; address?: string }): void {
    if (details.name) this.props.name = details.name;
    if (details.type) this.props.type = details.type;
    if (details.email !== undefined) this.props.email = details.email;
    if (details.phone !== undefined) this.props.phone = details.phone;
    if (details.address !== undefined) this.props.address = details.address;
    this.props.updatedAt = new Date();
  }
}
