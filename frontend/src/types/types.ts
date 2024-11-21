export interface Device {
    id: string;
    name: string;
    mobileNumber: string;
    lastConnection: string;
    latitude: number;
    longitude: number;
  }
  
  export interface NewDeviceInput {
    name: string;
    mobileNumber: string;
    lastConnection: string;
    latitude: string;
    longitude: string;
  }
  