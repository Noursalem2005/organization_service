import { Injectable } from '@nestjs/common';
import { IAuthServicePort } from '../../application/ports/auth-service.port';

@Injectable()
export class AuthServiceClient implements IAuthServicePort {
  async validateToken(token: string): Promise<{ userId: string; role: string } | null> {
    if (!token) return null;
    return { userId: 'user-123', role: 'ADMIN' };
  }
}
