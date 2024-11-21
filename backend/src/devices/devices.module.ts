import { Module } from '@nestjs/common';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';

@Module({
  providers: [DevicesResolver, DevicesService]
})
export class DevicesModule {}
