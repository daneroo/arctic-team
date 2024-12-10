import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import { Place } from '../types/Place';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { fetchOsmBuilding } from '../utils/osmFetch';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  places: Place[];
  center: [number, number];
  zoom: number;
  selectedPlace?: Place;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [map, center, zoom]);

  return null;
}

export function MapView({ places, center, zoom, selectedPlace }: MapViewProps) {
  const [buildingOutline, setBuildingOutline] = useState<GeoJSON.Feature | null>(null);

  useEffect(() => {
    async function fetchBuilding() {
      if (selectedPlace?.osmId) {
        const data = await fetchOsmBuilding(selectedPlace.osmId);
        setBuildingOutline(data);
      } else {
        setBuildingOutline(null);
      }
    }
    fetchBuilding();
  }, [selectedPlace]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full rounded-lg"
    >
      <MapUpdater center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buildingOutline && (
        <GeoJSON
          key={selectedPlace?.osmId}
          data={buildingOutline}
          style={{
            color: '#2563eb',
            weight: 2,
            fillColor: '#3b82f6',
            fillOpacity: 0.2
          }}
        />
      )}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={defaultIcon}
        >
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}