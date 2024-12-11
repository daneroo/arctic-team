import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, LayersControl } from 'react-leaflet';
import { Place } from '../types/Place';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { fetchOsmBuilding } from '../utils/osmFetch';
import { LatLngBounds } from 'leaflet';

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
  zoom?: number;
  bounds?: LatLngBounds;
  selectedPlace: Place | null;
  onMarkerClick?: (place: Place) => void;
}

interface MapUpdaterProps {
  center: [number, number];
  zoom?: number;
  bounds?: LatLngBounds;
}

function MapUpdater({ center, zoom, bounds }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (zoom !== undefined) {
      map.setView(center, zoom, {
        animate: true,
        duration: 1
      });
    }
  }, [map, center, zoom, bounds]);

  return null;
}

export function MapView({ places, center, zoom, bounds, selectedPlace, onMarkerClick }: MapViewProps) {
  const [buildingOutline, setBuildingOutline] = useState<GeoJSON.Feature | null>(null);

  useEffect(() => {
    async function fetchBuilding() {
      if (selectedPlace?.osm_id) {
        const data = await fetchOsmBuilding(selectedPlace.osm_id);
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
      zoom={zoom ?? 4}
      className="w-full h-full rounded-lg"
    >
      <MapUpdater center={center} zoom={zoom} bounds={bounds} />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Terrain">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {buildingOutline && (
        <GeoJSON
          key={selectedPlace?.osm_id}
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
          <Popup closeButton={false}>
            <div className="space-y-2">
              <p>{place.name}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onMarkerClick?.(place);
                  const popup = e.currentTarget.closest('.leaflet-popup');
                  if (popup) {
                    popup.classList.add('leaflet-popup-hide');
                    setTimeout(() => popup.remove(), 300);
                  }
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}