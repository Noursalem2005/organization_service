export class ClinicMember {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly clinicId: string,
    public readonly organizationId: string,
    public readonly userLevel: string,
    public readonly roles: string[],
    public readonly permissions: string[],
    public readonly isActive: boolean,
    public readonly roleMetadata?: Record<string, any>,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
