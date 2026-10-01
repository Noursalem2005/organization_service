import { Injectable } from '@nestjs/common';
@Injectable()
export class DoctorAssignedToClinicPublisher {
  async publish(payload: any): Promise<void> { console.log('Published DoctorAssignedToClinicEvent', payload); }
}
