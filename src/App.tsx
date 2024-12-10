import { useState, useEffect } from 'react';
import { Place } from './types/Place';
import { PlacesList } from './components/PlacesList';
import { MapView } from './components/MapView';
import { PlaceForm } from './components/PlaceForm';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import { supabase } from './lib/supabase';

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchPlaces() {
      const { data, error } = await supabase
        .from('places')
        .select('*');

      if (error) {
        console.error('Error fetching places:', error);
        return;
      }

      if (data) {
        setPlaces(data);
      }
    }

    fetchPlaces();
  }, []);

  const handlePlaceSubmit = async (placeData: Omit<Place, 'id'>) => {
    if (editingPlace) {
      // Update existing place
      const { error } = await supabase
        .from('places')
        .update(placeData)
        .eq('id', editingPlace.id);

      if (error) {
        console.error('Error updating place:', error);
        return;
      }
    } else {
      // Add new place
      const { error } = await supabase
        .from('places')
        .insert(placeData);

      if (error) {
        console.error('Error adding place:', error);
        return;
      }
    }

    // Refresh places list
    const { data } = await supabase.from('places').select('*');
    if (data) {
      setPlaces(data);
    }
    setEditingPlace(null);
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setEditingPlace(place);
  };

  const center: [number, number] = selectedPlace
    ? [selectedPlace.latitude, selectedPlace.longitude]
    : [56.1304, -106.3468];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <PlaceForm
              onSubmit={handlePlaceSubmit}
              onCancel={() => setEditingPlace(null)}
              initialData={editingPlace}
              mode={editingPlace ? 'edit' : 'create'}
            />
            <PlacesList
              places={places}
              onPlaceSelect={handlePlaceSelect}
              selectedPlace={selectedPlace}
            />
          </div>
          <div className="md:col-span-2 h-[600px]">
            <MapView
              places={places}
              center={center}
              zoom={selectedPlace ? 13 : 4}
              selectedPlace={selectedPlace}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;