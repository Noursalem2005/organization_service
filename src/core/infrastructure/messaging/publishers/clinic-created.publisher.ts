import { Injectable } from '@nestjs/common';
@Injectable()
export class ClinicCreatedPublisher {
  async publish(payload: any): Promise<void> { console.log('Published ClinicCreatedEvent', payload); }
}
