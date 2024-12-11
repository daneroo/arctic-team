export const translations = {
  en: {
    title: "Cambridge Bay",
    places: "Places",
    addPlace: "Add Place",
    placeName: "Place Name",
    latitude: "Latitude",
    longitude: "Longitude",
    language: "Language",
    updatePlace: "Update Place",
    editPlace: "Edit Place",
    cancelEdit: "Cancel",
    description: "Description",
    searchPlaces: "Search name, description...",
  },
  fr: {
    title: "Cambridge Bay",
    places: "Lieux",
    addPlace: "Ajouter un lieu",
    placeName: "Nom du lieu",
    latitude: "Latitude",
    longitude: "Longitude",
    language: "Langue",
    updatePlace: "Modifier le lieu",
    editPlace: "Éditer le lieu",
    cancelEdit: "Annuler",
    description: "Description",
    searchPlaces: "Rechercher nom, description...",
  },
};

export type Language = "en" | "fr";
export type TranslationKey = keyof typeof translations.en;
