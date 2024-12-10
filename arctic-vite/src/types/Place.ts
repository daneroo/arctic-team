export interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  osmId?: string; // OpenStreetMap way ID
}
