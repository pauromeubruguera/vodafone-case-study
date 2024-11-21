import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Devices } from './Devices';
import { GET_DEVICES, DELETE_DEVICE, CREATE_DEVICE } from '../graphql/queries';
import { Device } from '../types/types';

// Mock Data
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Device 1',
    mobileNumber: '1234567890',
    lastConnection: '2023-01-01T12:00:00Z',
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: '2',
    name: 'Device 2',
    mobileNumber: '0987654321',
    lastConnection: '2023-02-01T12:00:00Z',
    latitude: 34.0522,
    longitude: -118.2437,
  },
];

// Mock Queries
const mocks = [
  {
    request: { query: GET_DEVICES },
    result: { data: { devices: mockDevices } },
  },
  {
    request: { query: DELETE_DEVICE, variables: { id: '1' } },
    result: { data: { deleteDevice: { id: '1' } } },
  },
  {
    request: {
      query: CREATE_DEVICE,
      variables: { input: { name: 'New Device', mobileNumber: '5555555555', latitude: 10, longitude: 10 } },
    },
    result: {
      data: {
        createDevice: {
          id: '3',
          name: 'New Device',
          mobileNumber: '5555555555',
          lastConnection: '2023-03-01T12:00:00Z',
          latitude: 10,
          longitude: 10,
        },
      },
    },
  },
];

// Test Suite
describe('Devices Component', () => {
  it('renders the loading state', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Devices />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the devices list', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Devices />
      </MockedProvider>
    );

    // Wait for the mock data to load
    await screen.findByText('Device 1');
    await screen.findByText('Device 2');

    // Verify devices are rendered
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('0987654321')).toBeInTheDocument();
  });

  it('handles the delete action', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Devices />
      </MockedProvider>
    );

    await screen.findByText('Device 1');

    // Click delete button for Device 1
    const deleteButtons = screen.getAllByRole('button', { name: /delete device/i });
    fireEvent.click(deleteButtons[0]);

    // Wait for refetch to simulate deletion
    await waitFor(() => expect(screen.queryByText('Device 1')).not.toBeInTheDocument());
  });

  it('opens the AddDevice modal', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Devices />
      </MockedProvider>
    );

    await screen.findByText('Add Device');

    const addButton = screen.getByText('Add Device');
    fireEvent.click(addButton);

    // Verify modal is opened
    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText('Create New Device')).toBeInTheDocument();
  });

  it('opens and closes the DeviceDetails modal', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Devices />
      </MockedProvider>
    );

    await screen.findByText('Device 1');

    // Open DeviceDetails modal
    const detailButtons = screen.getAllByRole('button', { name: /detail device/i });
    fireEvent.click(detailButtons[0]);

     // Verify modal is opened
    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText('Device 1')).toBeInTheDocument();

     // Close modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Verify modal is closed
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
