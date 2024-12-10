import React, { useState } from 'react';
import { Place } from '../types/Place';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AddPlaceFormProps {
  onAddPlace: (place: Omit<Place, 'id'>) => void;
}

export function AddPlaceForm({ onAddPlace }: AddPlaceFormProps) {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && latitude && longitude) {
      onAddPlace({
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setName('');
      setLatitude('');
      setLongitude('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('placeName')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            {t('latitude')}
          </label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            step="any"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            {t('longitude')}
          </label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            step="any"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        <Plus className="w-4 h-4" />
        {t('addPlace')}
      </button>
    </form>
  );
}