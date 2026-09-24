import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE_PORT, IAuthServicePort } from '../../application/ports/auth-service.port';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_PORT)
    private readonly authServiceClient: IAuthServicePort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.slice(7).trim();
    const user = await this.authServiceClient.validateToken(token);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }

    request.user = user;
    return true;
  }
}
