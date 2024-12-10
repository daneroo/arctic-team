import React, { useState } from 'react';
import { Place } from './types/Place';
import { PlacesList } from './components/PlacesList';
import { MapView } from './components/MapView';
import { AddPlaceForm } from './components/AddPlaceForm';
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
    name: 'Ottawa Conference Centre',
    latitude: 45.4235,
    longitude: -75.6947,
  }
];

function App() {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { t } = useLanguage();

  const handleAddPlace = (newPlace: Omit<Place, 'id'>) => {
    const place: Place = {
      ...newPlace,
      id: Date.now().toString(),
    };
    setPlaces([...places, place]);
  };

  const center: [number, number] = selectedPlace
    ? [selectedPlace.latitude, selectedPlace.longitude]
    : [56.1304, -106.3468]; // Center of Canada

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <AddPlaceForm onAddPlace={handleAddPlace} />
            <PlacesList places={places} onPlaceSelect={setSelectedPlace} />
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