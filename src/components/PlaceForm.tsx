import React, { useEffect, useState } from 'react';
import { Place, ViewMode } from '../types/Place';
import { useLanguage } from '../hooks/useLanguage';

interface PlaceFormProps {
  onSubmit: (data: Omit<Place, 'id'>) => void;
  onCancel?: () => void;
  initialData: Place | null;
  mode: ViewMode;
}

export function PlaceForm({ onSubmit, onCancel, initialData, mode }: PlaceFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    osm_id: null as string | null,
    description: ''
  });

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        latitude: initialData.latitude.toString(),
        longitude: initialData.longitude.toString(),
        osm_id: initialData.osm_id,
        description: initialData.description
      });
    } else {
      // Reset form when clearing initialData
      setFormData({
        name: '',
        latitude: '',
        longitude: '',
        osm_id: null,
        description: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      osm_id: formData.osm_id,
      description: formData.description
    });
    // Only reset if it's a new place
    if (mode === 'new') {
      setFormData({ name: '', latitude: '', longitude: '', osm_id: null, description: '' });
    }
  };

  return (
    mode === 'edit' || mode === 'new' ? (
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
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('description')}
          </label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {mode === 'new' ? t('addPlace') : t('updatePlace')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            {t('cancelEdit')}
          </button>
        )}
      </form>
    ) : mode === 'view' ? (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{formData.name}</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p>Latitude: {formData.latitude}</p>
          <p>Longitude: {formData.longitude}</p>
        </div>
        {formData.osm_id && (
          <p className="text-gray-600">OSM ID: {formData.osm_id}</p>
        )}
        {formData.description && (
          <div className="text-gray-600">
            <p className="font-medium mb-1">Description:</p>
            <p>{formData.description}</p>
          </div>
        )}
      </div>
    ) : null
  );
} 