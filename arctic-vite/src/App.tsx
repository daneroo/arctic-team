import { useState } from 'react';
import { Place } from './types/Place';
import { PlacesList } from './components/PlacesList';
import { MapView } from './components/MapView';
import { PlaceForm } from './components/PlaceForm';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';

const initialPlaces: Place[] = [
  {
    id: '1',
    name: 'Cambridge Bay',
    latitude: 69.1169,
    longitude: -105.0593,
  },
  {
    id: '2',
    name: 'Université du Québec à Chicoutimi',
    latitude: 48.4197,
    longitude: -71.0538,
  },
  {
    id: '3',
    name: 'Université Laval',
    latitude: 46.7817,
    longitude: -71.2747,
  },
  {
    id: '4',
    name: 'Ottawa Shaw Centre',
    latitude: 45.4242529,
    longitude: -75.6912376,
    osmId: '264535169'
  }
];

function App() {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const { t } = useLanguage();

  const handlePlaceSubmit = (placeData: Omit<Place, 'id'>) => {
    if (editingPlace) {
      // Update existing place
      const updatedPlaces = places.map(p =>
        p.id === editingPlace.id
          ? { ...placeData, id: editingPlace.id }
          : p
      );
      setPlaces(updatedPlaces);
      setEditingPlace(null);
    } else {
      // Add new place
      const newPlace: Place = {
        ...placeData,
        id: Date.now().toString(),
      };
      setPlaces([...places, newPlace]);
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setEditingPlace(place);  // Populate form when selecting
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;