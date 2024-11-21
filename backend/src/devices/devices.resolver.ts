import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Device } from './device.model';
import { CreateDeviceInput } from './dto/create-device.input';
import { DevicesService } from './devices.service';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Query(() => [Device], { name: 'devices' })
  async getDevices(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Mutation(() => Device)
  async createDevice(@Args('input') input: CreateDeviceInput): Promise<Device> {
    return this.devicesService.create(input);
  }

  @Mutation(() => Device)
  async deleteDevice(@Args('id') id: string): Promise<Device> {
    return this.devicesService.delete(id);
  }
}
