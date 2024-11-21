import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DEVICES, DELETE_DEVICE, CREATE_DEVICE } from '../graphql/queries';
import { AddDevice } from '../components/AddDevice';
import { Device, NewDeviceInput } from '../types/types';
import { DeviceDetails } from '../components/DeviceDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

export const Devices: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<{ devices: Device[] }>(GET_DEVICES);
  const [deleteDevice] = useMutation<{ deleteDevice: { id: string } }>(DELETE_DEVICE);
  const [createDevice] = useMutation<{ createDevice: Device }>(CREATE_DEVICE);

  const [isAddDevice, setAddDevice] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteDevice({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error deleting device:', err);
    }
  };

  const handleCreate = async (newDevice: NewDeviceInput) => {
    try {
      await createDevice({
        variables: {
          input: {
            ...newDevice,
            latitude: parseFloat(newDevice.latitude),
            longitude: parseFloat(newDevice.longitude),
          },
        },
      });
      refetch();
    } catch (err) {
      console.error('Error creating device:', err);
    }
  };

  const handleShowDetails = (device: Device) => {
    setSelectedDevice(device);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDevice(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Devices</h1>
      <div className='table'>
        <div className='table-header'>
          <div>ID</div>
          <div>Name</div>
          <div>Mobile Number</div>
          <div>Last Connection</div>
          <div>Latitude</div>
          <div>Longitude</div>
          <div></div>
        </div>
        {data?.devices.map((device) => (
          <div className='table-content' key={device.id}>            
            <div>{device.id}</div>
            <div>{device.name}</div>
            <div>{device.mobileNumber}</div>
            <div>{device.lastConnection}</div>
            <div>{device.latitude}</div>
            <div>{device.longitude}</div>
            <div>
              <button className='delete-button'  aria-label="Delete device" onClick={() => handleDelete(device.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className='detail-button'  aria-label="Detail device" onClick={() => handleShowDetails(device)}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>
        ))}
      </div>


      <button style={{ marginTop: '20px' }} onClick={() => setAddDevice(true)}>Add Device</button>

      {isAddDevice && (
        <AddDevice
          onClose={() => setAddDevice(false)}
          onCreate={handleCreate}
        />
      )}

      {isModalOpen && selectedDevice && (
        <DeviceDetails device={selectedDevice} onClose={handleCloseModal} />
      )}
    </div>
  );
};
