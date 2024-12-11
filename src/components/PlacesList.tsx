import { MapPin, ArrowDownAZ, ArrowDownZA, Search, X } from 'lucide-react';
import { Place } from '../types/Place';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useMemo } from 'react';

interface PlacesListProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedPlace: Place | null;
}

export function PlacesList({ places, onPlaceSelect, selectedPlace }: PlacesListProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredAndSortedPlaces = useMemo(() => {
    return places
      .filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortAscending ? comparison : -comparison;
      });
  }, [places, searchTerm, sortAscending]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {t('places')}
        </div>
        <button
          onClick={() => setSortAscending(!sortAscending)}
          className="p-1 hover:bg-gray-100 rounded-md"
          title={sortAscending ? "Sort Z to A" : "Sort A to Z"}
        >
          {sortAscending ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowDownZA className="w-5 h-5" />}
        </button>
      </h2>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('searchPlaces')}
          className="w-full pl-9 pr-8 py-2 border rounded-md"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            title="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {filteredAndSortedPlaces.map((place) => (
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
        {filteredAndSortedPlaces.length === 0 && (
          <p className="text-gray-500 text-center py-4">No places found</p>
        )}
      </div>
    </div>
  );
}