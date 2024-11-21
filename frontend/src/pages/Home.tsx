import React from 'react';
import { useQuery } from '@apollo/client';
import { Map } from '../components/Map';
import { GET_DEVICES } from '../graphql/queries';

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
