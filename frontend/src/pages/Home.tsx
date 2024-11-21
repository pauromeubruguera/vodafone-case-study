import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Map } from '../components/Map';

const GET_DEVICES = gql`
  query {
    devices {
      id
      name
      latitude
      longitude
    }
  }
`;

export const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DEVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Home</h1>
      <Map devices={data.devices} />
    </div>
  );
};
