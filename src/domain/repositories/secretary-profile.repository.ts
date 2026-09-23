import { SecretaryProfileEntity } from '../entities/secretary-profile.entity';

export interface ISecretaryProfileRepository {
  save(profile: SecretaryProfileEntity): Promise<SecretaryProfileEntity>;
  findById(id: string): Promise<SecretaryProfileEntity | null>;
  findByUserId(userId: string): Promise<SecretaryProfileEntity | null>;
  update(profile: SecretaryProfileEntity): Promise<SecretaryProfileEntity>;
  delete(id: string): Promise<boolean>;
}

export const SECRETARY_PROFILE_REPOSITORY = 'SECRETARY_PROFILE_REPOSITORY';
