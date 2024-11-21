import React, { useState } from 'react';
import '../styles/devices.css';
import { NewDeviceInput } from '../types/types';

interface AddDeviceProps {
  onClose: () => void;
  onCreate: (device: NewDeviceInput) => void;
}

export const AddDevice: React.FC<AddDeviceProps> = ({ onClose, onCreate }) => {
  const [newDevice, setNewDevice] = useState<NewDeviceInput>({
    name: '',
    mobileNumber: '',
    lastConnection: '',
    latitude: '',
    longitude: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(newDevice);
    setNewDevice({ name: '', mobileNumber: '', lastConnection: '', latitude: '', longitude: '' });
    onClose();
  };

  return (
    <div className="modal" role="dialog" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Device</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
            </label>
            <input
              type="text"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>
              Mobile Number:
            </label>
            <input
              type="text"
              value={newDevice.mobileNumber}
              onChange={(e) => setNewDevice({ ...newDevice, mobileNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label>
              Last Connection:
            </label>
            <input
              type="text"
              value={newDevice.lastConnection}
              onChange={(e) => setNewDevice({ ...newDevice, lastConnection: e.target.value })}
              required
            />
          </div>
          <div>
            <label>
              Latitude:
            </label>
            <input
              type="text"
              value={newDevice.latitude}
              onChange={(e) => setNewDevice({ ...newDevice, latitude: e.target.value })}
              required
            />
          </div>
          <div>
            <label>
              Longitude:
            </label>
            <input
              type="text"
              value={newDevice.longitude}
              onChange={(e) => setNewDevice({ ...newDevice, longitude: e.target.value })}
              required
            />
          </div>
          <button type="submit">Create Device</button>
          <button type="button" onClick={onClose} className="cancel-button">Close</button>
        </form>
      </div>
    </div>
  );
};
