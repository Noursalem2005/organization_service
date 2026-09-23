export interface IAuthServicePort {
  validateToken(token: string): Promise<{ userId: string; role: string } | null>;
}
export const AUTH_SERVICE_PORT = 'AUTH_SERVICE_PORT';
