export class PhoneNumber {
  private readonly value: string;
  constructor(value: string) {
    if (!value || value.trim().length === 0) throw new Error('PhoneNumber cannot be empty');
    this.value = value;
  }
  getValue(): string { return this.value; }
  equals(other: PhoneNumber): boolean { return !!other && this.value === other.getValue(); }
}
