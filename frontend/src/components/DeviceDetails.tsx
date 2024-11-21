import React from 'react';
import '../styles/devices.css';
import { Device } from '../types/types';

interface DeviceModalProps {
  device: Device;
  onClose: () => void;
}

export const DeviceDetails: React.FC<DeviceModalProps> = ({ device, onClose }) => {
  return (
    <div className='detail-device' role="dialog" aria-modal="true" onClick={onClose}>
      <div className='detail-device-container'>
        <h2>{device.name}</h2>
        <p><strong>ID:</strong> {device.id}</p>
        <p><strong>Mobile Number:</strong> {device.mobileNumber}</p>
        <p><strong>Last Connection:</strong> {device.lastConnection}</p>
        <p><strong>Latitude:</strong> {device.latitude}</p>
        <p><strong>Longitude:</strong> {device.longitude}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
