export class OrganizationId {
  private readonly value: string;
  constructor(value: string) {
    if (!value || value.trim().length === 0) throw new Error('OrganizationId cannot be empty');
    this.value = value;
  }
  getValue(): string { return this.value; }
  equals(other: OrganizationId): boolean { return !!other && this.value === other.getValue(); }
}
