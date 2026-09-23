export class ClinicId {
  private readonly value: string;
  constructor(value: string) {
    if (!value || value.trim().length === 0) throw new Error('ClinicId cannot be empty');
    this.value = value;
  }
  getValue(): string { return this.value; }
  equals(other: ClinicId): boolean { return !!other && this.value === other.getValue(); }
}
