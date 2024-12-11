// import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
        className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}