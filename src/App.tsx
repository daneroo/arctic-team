import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Place } from './types/Place';
import { PlacesList } from './components/PlacesList';
import { MapView } from './components/MapView';
import { PlaceForm } from './components/PlaceForm';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './hooks/useLanguage';
import { supabase } from './db/supabase';
import { LeftPanelState } from './types/Place';
import { LatLngBounds, latLng } from 'leaflet';

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [leftPanel, setLeftPanel] = useState<LeftPanelState>({
    mode: 'none',
    place: null
  });
  const { t } = useLanguage();

  // Calculate map view based on filtered places or selected place
  const mapView = useMemo(() => {
    if (leftPanel.place) {
      // When a place is selected, center on it
      return {
        center: [leftPanel.place.latitude, leftPanel.place.longitude] as [number, number],
        zoom: 13
      };
    } else if (filteredPlaces.length > 0) {
      // Calculate bounds for filtered places
      const bounds = new LatLngBounds(
        filteredPlaces.map(p => latLng(p.latitude, p.longitude))
      );
      // Get center of bounds
      const center = bounds.getCenter();
      return {
        center: [center.lat, center.lng] as [number, number],
        zoom: filteredPlaces.length === 1 ? 13 : undefined,
        bounds: bounds
      };
    } else {
      // Default view of Canada
      return {
        center: [56.1304, -106.3468] as [number, number],
        zoom: 4
      };
    }
  }, [leftPanel.place, filteredPlaces]);

  useEffect(() => {
    async function fetchPlaces() {
      console.log('Fetching places...');
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching places:', error);
        return;
      }

      console.log('Fetched places:', data);
      if (data) {
        setPlaces(data);
      }
    }

    fetchPlaces();
  }, []);

  const handlePlaceSubmit = async (placeData: Omit<Place, 'id'>) => {
    console.log('Place data being submitted:', placeData);

    if (leftPanel.place) {
      // Update existing place
      const { error } = await supabase
        .from('places')
        .update(placeData)
        .eq('id', leftPanel.place.id);

      if (error) {
        console.error('Error updating place:', error);
        return;
      }
    } else {
      // Add new place without specifying the ID
      const { error } = await supabase
        .from('places')
        .insert(placeData); // Ensure placeData does not include an ID

      if (error) {
        console.error('Error adding place:', error);
        return;
      }
    }

    // Refresh places list
    const { data } = await supabase
      .from('places')
      .select('*')
      .order('name');
    if (data) {
      setPlaces(data);
    }
    setLeftPanel({
      mode: 'none',
      place: null
    });
  };

  const handlePlaceSelect = (place: Place) => {
    setLeftPanel({
      mode: 'view',
      place
    });
  };

  const handleEditClick = () => {
    setLeftPanel(current => ({
      mode: 'edit',
      place: current.place
    }));
  };

  const handleNewClick = () => {
    setLeftPanel({
      mode: 'new',
      place: null
    });
  };

  const handleCancel = () => {
    const wasEditing = leftPanel.mode === 'edit';
    setLeftPanel({
      mode: wasEditing ? 'view' : 'none',
      place: wasEditing ? leftPanel.place : null
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="flex justify-between">
              {leftPanel.mode === 'none' && (
                <button
                  onClick={handleNewClick}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  {t('addPlace')}
                </button>
              )}
              {leftPanel.mode === 'view' && leftPanel.place && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setLeftPanel({ mode: 'none', place: null })}
                    className="bg-gray-500 text-white py-2 px-3 rounded hover:bg-gray-600 flex items-center"
                    title="Back to list"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    {t('editPlace')}
                  </button>
                </div>
              )}
            </div>
            <PlaceForm
              onSubmit={handlePlaceSubmit}
              onCancel={handleCancel}
              initialData={leftPanel.place}
              mode={leftPanel.mode}
            />
            {leftPanel.mode === 'none' ? (
              <PlacesList
                places={places}
                onPlaceSelect={handlePlaceSelect}
                selectedPlace={leftPanel.place}
                onFilteredPlacesChange={setFilteredPlaces}
              />
            ) : null}
          </div>
          <div className="md:col-span-2 h-[600px]">
            <MapView
              places={filteredPlaces}
              center={mapView.center}
              zoom={mapView.zoom}
              bounds={mapView.bounds}
              selectedPlace={leftPanel.place}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;