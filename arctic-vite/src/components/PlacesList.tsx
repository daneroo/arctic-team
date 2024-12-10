// import React from 'react';
import { MapPin } from 'lucide-react';
import { Place } from '../types/Place';
import { useLanguage } from '../contexts/LanguageContext';

interface PlacesListProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedPlace: Place | null;
}

export function PlacesList({ places, onPlaceSelect, selectedPlace }: PlacesListProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        {t('places')}
      </h2>
      <div className="space-y-2">
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => onPlaceSelect(place)}
            className={`w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2 ${selectedPlace?.id === place.id ? 'bg-blue-100' : ''
              }`}
          >
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{place.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}