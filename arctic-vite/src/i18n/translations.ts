export const translations = {
  en: {
    title: 'Canadian Places Explorer',
    places: 'Places',
    addPlace: 'Add Place',
    placeName: 'Place Name',
    latitude: 'Latitude',
    longitude: 'Longitude',
    language: 'Language',
  },
  fr: {
    title: 'Explorateur des lieux canadiens',
    places: 'Lieux',
    addPlace: 'Ajouter un lieu',
    placeName: 'Nom du lieu',
    latitude: 'Latitude',
    longitude: 'Longitude',
    language: 'Langue',
  }
};

export type Language = 'en' | 'fr';
export type TranslationKey = keyof typeof translations.en;