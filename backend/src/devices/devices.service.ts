import { Injectable } from '@nestjs/common';
import { Device } from './device.model';
import { CreateDeviceInput } from './dto/create-device.input';

@Injectable()
export class DevicesService {
  private devices: Device[] = [
    {
      id: '1',
      name: 'Device 1',
      mobileNumber: '5556667778',
      lastConnection: '2024-11-19T14:00:00Z',
      latitude: 41.3884,
      longitude: 2.1925,
    },
    {
      id: '2',
      name: 'Device 2',
      mobileNumber: '9876543210',
      lastConnection: '2024-11-19T12:00:00Z',
      latitude: 41.3881,
      longitude: 2.1922,
    },
    {
      id: '3',
      name: 'Device 3',
      mobileNumber: '1112233445',
      lastConnection: '2024-11-19T14:30:00Z',
      latitude: 41.3882,
      longitude: 2.1926,
    },
    {
      id: '4',
      name: 'Device 4',
      mobileNumber: '5551234567',
      lastConnection: '2024-11-19T16:00:00Z',
      latitude: 41.3882,
      longitude: 2.1923,
    },
    {
      id: '5',
      name: 'Device 5',
      mobileNumber: '7778889990',
      lastConnection: '2024-11-19T18:15:00Z',
      latitude: 41.3882,
      longitude: 2.1925,
    },
    {
      id: '6',
      name: 'Device 6',
      mobileNumber: '9876543211',
      lastConnection: '2024-11-19T20:45:00Z',
      latitude: 41.3885,
      longitude: 2.1926,
    },
    {
      id: '7',
      name: 'Device 7',
      mobileNumber: '1231231234',
      lastConnection: '2024-11-19T22:30:00Z',
      latitude: 41.3883,
      longitude: 2.1925,
    },
    {
      id: '8',
      name: 'Device 8',
      mobileNumber: '4445556667',
      lastConnection: '2024-11-19T08:00:00Z',
      latitude: 41.3885,
      longitude: 2.1925,
    },
    {
      id: '9',
      name: 'Device 9',
      mobileNumber: '3334445556',
      lastConnection: '2024-11-19T10:30:00Z',
      latitude: 41.3884,
      longitude: 2.1923,
    },
    {
      id: '10',
      name: 'Device 10',
      mobileNumber: '6667778889',
      lastConnection: '2024-11-19T12:45:00Z',
      latitude: 41.3884,
      longitude: 2.1926,
    },
  ];

  findAll(): Device[] {
    return this.devices;
  }

  create(input: CreateDeviceInput): Device {
    const newDevice: Device = {
      id: Date.now().toString(), // Generar un ID único
      ...input,
    };
    this.devices.push(newDevice);
    return newDevice;
  }

  delete(id: string): Device {
    const index = this.devices.findIndex((device) => device.id === id);
    if (index === -1) {
      throw new Error('Device not found');
    }
    const [deletedDevice] = this.devices.splice(index, 1);
    return deletedDevice;
  }
}
