import { supabase } from "../supabase";

const initialPlaces = [
  {
    id: "1",
    name: "Cambridge Bay",
    latitude: 69.1169,
    longitude: -105.0593,
  },
  {
    id: "2",
    name: "Université du Québec à Chicoutimi",
    latitude: 48.4197,
    longitude: -71.0538,
  },
  {
    id: "3",
    name: "Université Laval",
    latitude: 46.7817,
    longitude: -71.2747,
  },
  {
    id: "4",
    name: "Ottawa Shaw Centre",
    latitude: 45.4242529,
    longitude: -75.6912376,
    osm_id: "264535169",
  },
];

export async function seedInitialPlaces() {
  const { error } = await supabase.from("places").upsert(initialPlaces, {
    onConflict: "id",
    ignoreDuplicates: false,
  });

  if (error) {
    console.error("Error seeding places:", error);
    throw error;
  }

  console.log("Successfully seeded initial places");
}

// Run if this file is executed directly
if (require.main === module) {
  seedInitialPlaces().catch(console.error);
}
