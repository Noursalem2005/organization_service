import { Injectable } from '@nestjs/common';
@Injectable()
export class DoctorCreatedPublisher {
  async publish(payload: any): Promise<void> { console.log('Published DoctorCreatedEvent', payload); }
}
