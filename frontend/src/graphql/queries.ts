import { gql } from '@apollo/client';

export const GET_DEVICES = gql`
  query {
    devices {
      id
      name
      mobileNumber
      lastConnection
      latitude
      longitude
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation DeleteDevice($id: String!) {
    deleteDevice(id: $id) {
      id
    }
  }
`;

export const CREATE_DEVICE = gql`
  mutation CreateDevice($input: CreateDeviceInput!) {
    createDevice(input: $input) {
      id
      name
      mobileNumber
      lastConnection
      latitude
      longitude
    }
  }
`;
