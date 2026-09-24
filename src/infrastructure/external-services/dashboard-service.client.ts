import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

export interface IDashboardServicePort {
  getSpecialties(onlyActive?: boolean): Promise<{ id: string; slug: string }[]>;
}

export const DASHBOARD_SERVICE_PORT = 'DASHBOARD_SERVICE_PORT';

@Injectable()
export class DashboardServiceClient implements IDashboardServicePort, OnModuleInit {
  private gRpcClient: any;

  onModuleInit() {
    const protoPath = path.join(__dirname, 'proto', 'dashboard.proto');
    const packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as any;
    const dashboardGrpcUrl = process.env.DASHBOARD_GRPC_URL || 'localhost:50052';
    this.gRpcClient = new proto.medical.dashboard.DashboardService(
      dashboardGrpcUrl,
      grpc.credentials.createInsecure(),
    );
  }

  async getSpecialties(onlyActive = true): Promise<{ id: string; slug: string }[]> {
    return new Promise((resolve) => {
      if (!this.gRpcClient) {
        return resolve([]);
      }
      this.gRpcClient.GetSpecialties({ onlyActive }, (err: any, response: any) => {
        if (err || !response || !response.data) {
          console.error('[DashboardServiceClient gRPC Error]', err?.message);
          return resolve([]);
        }
        const specialties = response.data.map((item: any) => ({
          id: item._id,
          slug: item.slug,
        }));
        resolve(specialties);
      });
    });
  }
}
