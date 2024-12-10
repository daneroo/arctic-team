import React, { useEffect, useState } from 'react';
import { Place } from '../types/Place';
import { useLanguage } from '../contexts/LanguageContext';

interface PlaceFormProps {
  onSubmit: (place: Omit<Place, 'id'>) => void;
  onCancel?: () => void;
  initialData?: Place | null;
  mode: 'create' | 'edit';
}

export function PlaceForm({ onSubmit, onCancel, initialData, mode }: PlaceFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        latitude: initialData.latitude.toString(),
        longitude: initialData.longitude.toString()
      });
    } else {
      // Reset form when clearing initialData
      setFormData({
        name: '',
        latitude: '',
        longitude: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    });
    // Only reset if it's a new place
    if (mode === 'create') {
      setFormData({ name: '', latitude: '', longitude: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('placeName')}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('latitude')}
        </label>
        <input
          type="number"
          step="any"
          value={formData.latitude}
          onChange={e => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('longitude')}
        </label>
        <input
          type="number"
          step="any"
          value={formData.longitude}
          onChange={e => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {mode === 'create' ? t('addPlace') : t('updatePlace')}
      </button>
      {mode === 'edit' && (
        <button
          type="button"
          onClick={() => {
            setFormData({ name: '', latitude: '', longitude: '' });
            onCancel?.();
          }}
          className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          {t('cancelEdit')}
        </button>
      )}
    </form>
  );
} 