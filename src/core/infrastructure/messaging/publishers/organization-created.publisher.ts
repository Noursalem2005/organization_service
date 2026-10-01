import { Injectable } from '@nestjs/common';
@Injectable()
export class OrganizationCreatedPublisher {
  async publish(payload: any): Promise<void> { console.log('Published OrganizationCreatedEvent', payload); }
}
