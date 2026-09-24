import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { IAuthServicePort } from '../../application/ports/auth-service.port';

@Injectable()
export class AuthServiceClient implements IAuthServicePort, OnModuleInit {
  private gRpcClient: any;

  onModuleInit() {
    const protoPath = path.join(__dirname, 'proto', 'auth.proto');
    const packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as any;
    const authGrpcUrl = process.env.AUTH_GRPC_URL || 'localhost:50051';
    this.gRpcClient = new proto.medical.auth.AuthService(
      authGrpcUrl,
      grpc.credentials.createInsecure(),
    );
  }

  async validateToken(token: string): Promise<{ userId: string; role: string; isSuperAdmin?: boolean } | null> {
    if (!token) return null;

    return new Promise((resolve) => {
      if (!this.gRpcClient) {
        return resolve(null);
      }
      this.gRpcClient.VerifyToken({ token }, (err: any, response: any) => {
        if (err || !response) {
          console.error('[AuthServiceClient gRPC Error]', err?.message);
          return resolve(null);
        }
        resolve({
          userId: response.userId || 'user-from-token',
          role: response.isSuperAdmin ? 'SUPERADMIN' : 'USER',
          isSuperAdmin: response.isSuperAdmin,
        });
      });
    });
  }
}
