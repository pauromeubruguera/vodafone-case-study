import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const containerStyle = {
  width: '100%',
  height: '70vh',
};

const center = {
  lat: 41.3884, // Centro de Barcelona
  lng: 2.1925,
};

const zoom = 12;

interface Device {
  id: string;
  name: string;
  mobileNumber: string;
  lastConnection: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  devices: Device[];
}

export const Map: React.FC<MapProps> = ({ devices }) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleMarkerClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleCloseInfoWindow = () => {
    setSelectedDevice(null);
  };

  const renderMarkers = (map: google.maps.Map) => {
    // Crear los marcadores y asignarles el evento de clic
    const markers = devices.map((device) => {
      const marker = new google.maps.Marker({
        position: { lat: device.latitude, lng: device.longitude },
        title: device.name,
      });

      marker.addListener('click', () => {
        handleMarkerClick(device);
      });

      return marker;
    });

    // Agregar el MarkerClusterer
    const markerCluster = new MarkerClusterer({ markers, map });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDepr0_xghKjwqLVNiQxTRgK0o6JZnYy2c">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={renderMarkers} // Llamamos a renderMarkers cuando el mapa se carga
      >
        {/* InfoWindow que aparece cuando seleccionamos un marcador */}
        {selectedDevice && (
          <InfoWindow
            position={{
              lat: selectedDevice.latitude,
              lng: selectedDevice.longitude,
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              <h3>{selectedDevice.name}</h3>
              <p><strong>Mobile Number:</strong> {selectedDevice.mobileNumber}</p>
              <p><strong>Last Connection:</strong> {selectedDevice.lastConnection}</p>
              <p><strong>Latitude:</strong> {selectedDevice.latitude}</p>
              <p><strong>Longitude:</strong> {selectedDevice.longitude}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
