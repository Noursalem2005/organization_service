export interface IAuthServicePort {
  validateToken(token: string): Promise<{ userId: string; role: string; isSuperAdmin?: boolean } | null>;
}
export const AUTH_SERVICE_PORT = 'AUTH_SERVICE_PORT';
